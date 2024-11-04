import { Webchat, WebchatProvider, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";


const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

// Add your Client ID here ⬇️
const clientId = "06dca768-4018-4888-b94a-e7c755000f9d";
const config = {
  composerPlaceholder: "Start your query with CHECK FOR",
  botName: "CourseBOT",
  botAvatar: "https://upload.wikimedia.org/wikipedia/en/f/f5/Indian_Institute_of_Information_Technology%2C_Nagpur_Logo.svg",
  botDescription: "First Question Should always be WHAT KNOWLEDGE BASE YOU ARE USING",
  sendmessage: "First Question Should always be WHAT KNOWLEDGE BASE YOU ARE USING",
};

export default function Bot() {
  const client = getClient({ clientId, mode: 'messaging' });

  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <style>{style}</style>
      <WebchatProvider theme={theme} configuration={config} client={client}>
        <Webchat />
      </WebchatProvider>
    </div>
  );
}
