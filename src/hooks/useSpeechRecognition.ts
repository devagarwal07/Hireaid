import { useState, useEffect, useCallback, useRef } from "react";

// Add missing typescript definitions for Web Speech API
interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
    interface Window {
        SpeechRecognition: {
            new(): SpeechRecognition;
        };
        webkitSpeechRecognition: {
            new(): SpeechRecognition;
        };
    }
}

export function useSpeechRecognition() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                    let currentInterim = "";
                    let currentFinal = "";

                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const result = event.results[i];
                        if (result.isFinal) {
                            currentFinal += result[0].transcript + " ";
                        } else {
                            currentInterim += result[0].transcript;
                        }
                    }

                    if (currentFinal) {
                        setTranscript((prev) => prev + currentFinal);
                    }
                    setInterimTranscript(currentInterim);
                };

                recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
                    console.error("Speech recognition error", event.error);
                    if (event.error !== 'no-speech') {
                        setError(event.error);
                    }
                };

                recognitionRef.current.onend = () => {
                    // Reactivate if we are meant to be listening (handles auto-stops from silence)
                    if (isListening) {
                        try {
                            recognitionRef.current?.start();
                        } catch (e) {
                            console.error("Auto-restart failed", e);
                            setIsListening(false);
                        }
                    } else {
                        setIsListening(false);
                    }
                };
            } else {
                setError("Browser does not support Speech Recognition");
            }
        }
    }, []); // Only setup once

    // Effect to handle isListening prop changes for the auto-restart functionality
    useEffect(() => {
        if (!recognitionRef.current) return;

        // This effect solely helps handle the onend auto-restart synchronization
        const originalOnEnd = recognitionRef.current.onend;

        recognitionRef.current.onend = () => {
            if (isListening && recognitionRef.current) {
                try {
                    // Slight delay to prevent immediate crashing on repeated stops
                    setTimeout(() => recognitionRef.current?.start(), 100);
                } catch (err) {
                    console.error("Failed to auto-restart recognition", err);
                    setIsListening(false);
                }
            } else {
                setIsListening(false);
            }
            // we don't call the original because we're overriding our own setup here anyway
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onend = originalOnEnd;
            }
        }
    }, [isListening]);


    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            setError(null);
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e: any) {
                if (e.name === 'InvalidStateError') {
                    // Already started
                    setIsListening(true);
                } else {
                    setError(e.message);
                }
            }
        } else {
            setError("Speech recognition is not initialized");
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            setIsListening(false); // Update state first to prevent auto-restart
            recognitionRef.current.stop();
        }
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript("");
        setInterimTranscript("");
    }, []);

    return {
        isListening,
        transcript,
        interimTranscript,
        startListening,
        stopListening,
        resetTranscript,
        error,
        isSupported: !!recognitionRef.current
    };
}
