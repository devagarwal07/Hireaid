import { useEffect, useState } from "react";
// @ts-ignore
import DailyIframe, { type DailyCall } from "@daily-co/daily-js";
// @ts-ignore
import { DailyProvider, useLocalSessionId, useParticipantIds, DailyVideo, useDaily, useLocalParticipant } from "@daily-co/daily-react";
import { Mic, MicOff, Video, VideoOff, Users, MessageSquare, PhoneOff, MoreHorizontal } from "lucide-react";

type VideoContainerProps = {
    url: string;
    token?: string;
    onLeave?: () => void;
};

// Main container that initializes the Daily call object
export function VideoContainer({ url, token, onLeave }: VideoContainerProps) {
    const [callObject, setCallObject] = useState<DailyCall | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;

        let isMounted = true;
        let callObj = DailyIframe.getCallInstance();

        if (!callObj) {
            callObj = DailyIframe.createCallObject({
                videoSource: true,
                audioSource: true,
            });
        }

        setCallObject(callObj);

        // Define exact handlers so we can remove them later
        const handleCameraError = (e: any) => console.error("Camera Error:", e);
        const handleDailyError = (e: any) => console.error("Daily Error:", e);

        // Add hardware and general error listeners
        callObj.on('camera-error', handleCameraError);
        callObj.on('error', handleDailyError);

        // Request camera/mic permissions first before joining the room
        callObj.startCamera().then(() => {
            if (!isMounted) return;
            const isMock = (window as any).__isMockDailyRoom;
            if (isMock) {
                console.log("Mock room detected, skipping join API to prevent 404 error.");
                callObj.setLocalVideo(true);
                callObj.setLocalAudio(true);
                setError("You are in a mock room because DAILY_API_KEY is not set. Real video connections will not work, but your local camera is on.");
                return;
            }
            console.log("Camera permissions requested, joining room");
            return callObj.join({ url, token });
        }).then((joinResult) => {
            if (!isMounted || !joinResult) return;
            console.log("Joined room successfully, turning on video");
            callObj.setLocalVideo(true);
            callObj.setLocalAudio(true);
        }).catch((err: any) => {
            if (!isMounted) return;
            console.error("Failed to join Daily call", err);
            setError(err?.message || "Failed to join video call.");
        });

        return () => {
            isMounted = false;
            callObj.off('camera-error', handleCameraError);
            callObj.off('error', handleDailyError);
            // Just leave the room, do not destroy the singleton to avoid race conditions
            if (callObj.meetingState() !== 'left-meeting') {
                callObj.leave().catch((e: any) => console.warn("Error leaving daily:", e));
            }
        };
    }, [url, token]);

    if (error) {
        return <div className="text-red-400 flex items-center justify-center w-full h-full p-4 text-center bg-gray-900 rounded-lg">{error}</div>;
    }

    if (!callObject) return <div className="text-white flex items-center justify-center w-full h-full bg-gray-900 rounded-lg">Connecting to Video...</div>;

    return (
        <DailyProvider callObject={callObject}>
            <VideoGrid onLeave={onLeave} />
        </DailyProvider>
    );
}

// Renders the local and remote participants
function VideoGrid({ onLeave }: { onLeave?: () => void }) {
    const localSessionId = useLocalSessionId();
    const callObject = useDaily();
    const remoteParticipantIds = useParticipantIds({ filter: "remote" });

    // UI overlays
    const [activeTab, setActiveTab] = useState<'chat' | 'participants' | 'more' | null>(null);
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([
        { sender: 'System', text: 'Welcome to the interview!' }
    ]);
    const [chatInput, setChatInput] = useState("");

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        setMessages([...messages, { sender: 'You', text: chatInput.trim() }]);
        setChatInput("");
    };

    const toggleTab = (tab: 'chat' | 'participants' | 'more') => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    // Actual Daily media state from hooks
    const localParticipant = useLocalParticipant();

    // Default to true (or what Daily says) so we don't show "Camera Off" while it's loading
    const localVideo = localParticipant?.video ?? true;
    const localAudio = localParticipant?.audio ?? true;

    const isVideoOff = !localVideo;
    const isMuted = !localAudio;

    const toggleMute = () => {
        if (callObject) {
            console.log("Toggling Mute. Current:", localAudio);
            callObject.setLocalAudio(!localAudio);
        }
    };

    const toggleVideo = () => {
        if (callObject) {
            console.log("Toggling Video. Current:", localVideo);
            callObject.setLocalVideo(!localVideo);
        }
    };

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden rounded-lg">
            {/* View indicator badge */}
            <div className="absolute top-3 left-3 text-xs text-white bg-black/40 px-2 py-1 rounded flex items-center gap-1 z-10">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Live
            </div>

            {/* Remote Participant (Main view) */}
            {remoteParticipantIds.length > 0 ? (
                <div className="w-full h-full">
                    <DailyVideo
                        sessionId={remoteParticipantIds[0]}
                        type="video"
                        fit="cover"
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="text-white/60 text-sm font-medium flex flex-col items-center gap-2">
                    <Users className="w-8 h-8 text-white/40" />
                    Waiting for candidate to join...
                </div>
            )}

            {/* Video Panels (Chat / Participants) */}
            {activeTab === 'chat' && (
                <div className="absolute right-0 top-0 bottom-16 w-80 bg-gray-900 border-l border-gray-700 flex flex-col z-20">
                    <div className="p-3 border-b border-gray-700 flex items-center justify-between text-white font-medium">
                        <span>Chat</span>
                        <button onClick={() => setActiveTab(null)} className="text-gray-400 hover:text-white">✕</button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-300">
                        <div className="text-center text-gray-500 my-4 text-xs">Chat started</div>
                        {messages.map((msg, i) => (
                            <div key={i} className={`mb-3 flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-3 py-2 rounded-lg max-w-[90%] ${msg.sender === 'You' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                                    {msg.sender !== 'You' && <span className="font-semibold text-xs block mb-1 text-blue-400">{msg.sender}</span>}
                                    <span>{msg.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-gray-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-800 text-white rounded p-2 text-sm border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'participants' && (
                <div className="absolute right-0 top-0 bottom-16 w-80 bg-gray-900 border-l border-gray-700 flex flex-col z-20">
                    <div className="p-3 border-b border-gray-700 flex items-center justify-between text-white font-medium">
                        <span>Participants ({remoteParticipantIds.length + 1})</span>
                        <button onClick={() => setActiveTab(null)} className="text-gray-400 hover:text-white">✕</button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-300 space-y-3">
                        <div className="flex items-center justify-between">
                            <span>You (Candidate)</span>
                            <div className="flex gap-2">
                                {isMuted ? <MicOff size={14} className="text-red-400" /> : <Mic size={14} className="text-green-400" />}
                                {isVideoOff ? <VideoOff size={14} className="text-red-400" /> : <Video size={14} className="text-green-400" />}
                            </div>
                        </div>
                        {remoteParticipantIds.map(id => (
                            <div key={id} className="flex items-center justify-between">
                                <span>Host (Interviewer)</span>
                                <div className="flex gap-2">
                                    <Mic size={14} className="text-green-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'more' && (
                <div className="absolute right-4 bottom-20 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl flex flex-col z-20 py-1 overflow-hidden">
                    <button className="px-4 py-2 text-left text-sm text-white hover:bg-gray-700">Device Settings</button>
                    <button className="px-4 py-2 text-left text-sm text-white hover:bg-gray-700">Record Meeting</button>
                    <button className="px-4 py-2 text-left text-sm text-white hover:bg-gray-700">Report Issue</button>
                </div>
            )}

            {/* Local Participant (PiP) */}
            <div className={`absolute top-4 ${activeTab ? 'right-84' : 'right-4'} w-32 h-24 bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 z-10 transition-all duration-300`}>
                {localSessionId && (
                    <DailyVideo
                        sessionId={localSessionId}
                        type="video"
                        fit="cover"
                        className={`w-full h-full object-cover ${isVideoOff ? 'opacity-0' : 'opacity-100'}`}
                    />
                )}
                {isVideoOff && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs text-center p-2 pointer-events-none z-10">Camera Off</div>
                )}
                <div className="absolute bottom-1 right-1 text-[10px] bg-black/50 px-1 rounded text-white backdrop-blur-sm z-20">You</div>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 px-4 py-3 flex items-center justify-center gap-3 backdrop-blur-md z-10">
                <button
                    onClick={toggleMute}
                    className={`p-2 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1 transition-colors ${isMuted ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'hover:bg-white/10'}`}
                >
                    {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                    <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                <button
                    onClick={toggleVideo}
                    className={`p-2 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1 transition-colors ${isVideoOff ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'hover:bg-white/10'}`}
                >
                    {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
                    <span>{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
                </button>
                <button
                    onClick={() => toggleTab('participants')}
                    className={`p-2 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1 transition-colors ${activeTab === 'participants' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                    <Users size={18} />
                    <span>Participants</span>
                </button>
                <button
                    onClick={() => toggleTab('chat')}
                    className={`p-2 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1 transition-colors ${activeTab === 'chat' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                    <MessageSquare size={18} />
                    <span>Chat</span>
                </button>
                <button
                    onClick={onLeave}
                    className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white shadow-lg shadow-red-500/20 transition-all text-xs flex flex-col items-center gap-1"
                >
                    <PhoneOff size={18} />
                    <span>End</span>
                </button>
                <button
                    onClick={() => toggleTab('more')}
                    className={`p-2 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1 transition-colors ${activeTab === 'more' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                    <MoreHorizontal size={18} />
                    <span>More</span>
                </button>
            </div>
        </div>
    );
}

