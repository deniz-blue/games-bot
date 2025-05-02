declare module "react-devtools-core" {
    export type ProfilingSettings = {
        recordChangeDescriptions?: boolean,
        recordTimeline?: boolean,
    };

    export type DevToolsHookSettings = {
        appendComponentStack?: boolean,
        breakOnConsoleErrors?: boolean,
        showInlineWarningsAndErrors?: boolean,
        hideConsoleLogsInStrictMode?: boolean,
    };

    export type ConnectOptions = {
        host?: string,
        nativeStyleEditorValidAttributes?: readonly string[],
        port?: number,
        useHttps?: boolean,
        // resolveRNStyle?: ResolveNativeStyle,
        retryConnectionDelay?: number,
        isAppActive?: () => boolean,
        // websocket?: WebSocket,
        onSettingsUpdated?: (settings: DevToolsHookSettings) => void,
        isReloadAndProfileSupported?: boolean,
        isProfiling?: boolean,
        onReloadAndProfile?: (recordChangeDescriptions: boolean) => void,
        onReloadAndProfileFlagsReset?: () => void,
    };

    export function initialize(
        maybeSettingsOrSettingsPromise?:
          | DevToolsHookSettings
          | Promise<DevToolsHookSettings>,
        shouldStartProfilingNow?: boolean,
        profilingSettings?: ProfilingSettings,
    ): void

    export function connectToDevTools(options?: ConnectOptions): void;
}
