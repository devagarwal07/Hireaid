import React from "react";

interface Integration {
  name: string;
  description: string;
  isIntegrated: boolean;
  email?: string;
}

const Integrations: React.FC = () => {
  const integratedSoftwares: Integration[] = [
    {
      name: "LinkedIn",
      description: "HireAide****@LinkedIn.com",
      isIntegrated: true,
    },
  ];

  const availableIntegrations: Integration[] = [
    {
      name: "HR Software",
      description: "Access to all privileges",
      isIntegrated: false,
    },
    {
      name: "Job Boards",
      description: "Access to Schedule, Interview Prep",
      isIntegrated: false,
    },
    {
      name: "Netsuite",
      description:
        "Access to JD Creation, Candidate profiles, 360 evaluation, Hiring pipeline, Schedule creation, Interview reports",
      isIntegrated: false,
    },
    {
      name: "Accounts",
      description:
        "Access to JD Creation, Candidate profiles, 360 evaluation, Hiring pipeline, Schedule creation, Interview reports",
      isIntegrated: false,
    },
  ];

  const handleUnlink = (name: string) => {
    console.log(`Unlinking ${name}`);
  };

  const handleIntegrate = (name: string) => {
    console.log(`Integrating ${name}`);
  };

  return (
    <div
      className="bg-white rounded-lg p-6 border border-gray-200"
      style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
    >
      <h2 className="text-2xl font-semibold text-[#181D27] mb-4">
        Integrations
      </h2>
      <hr className="border-t border-gray-200 mb-6" />

      {/* Integrated Softwares Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-[#626262] mb-4">
          Integrated Softwares
        </h3>
        <div className="border border-gray-200 rounded-lg">
          {integratedSoftwares.map((software, index) => (
            <div key={software.name}>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h4 className="text-base font-medium text-[#181D27] mb-1">
                    {software.name}
                  </h4>
                  <p className="text-sm text-[#626262]">
                    {software.description}
                  </p>
                </div>
                <button
                  onClick={() => handleUnlink(software.name)}
                  className="text-[#ff3636] text-sm font-medium hover:underline"
                >
                  Unlink
                </button>
              </div>
              {index < integratedSoftwares.length - 1 && (
                <hr className="border-t border-gray-200 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Integrations Section */}
      <div>
        <h3 className="text-base font-medium text-[#626262] mb-4">
          Available Integrations
        </h3>
        <div className="border border-gray-200 rounded-lg">
          {availableIntegrations.map((integration, index) => (
            <div key={integration.name}>
              <div className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <h4 className="text-base font-medium text-[#181D27] mb-1">
                    {integration.name}
                  </h4>
                  <p className="text-sm text-[#626262]">
                    {integration.description}
                  </p>
                </div>
                <button
                  onClick={() => handleIntegrate(integration.name)}
                  className="text-[#3B82F6] text-sm font-medium hover:underline ml-4"
                >
                  Integrate
                </button>
              </div>
              {index < availableIntegrations.length - 1 && (
                <hr className="border-t border-gray-200 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
