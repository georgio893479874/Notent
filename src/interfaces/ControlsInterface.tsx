import { ISong } from "./SongInterface";

interface IControls {
    type: string;
    min: number;
    max: number;
    song?: ISong;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    skipBegin: () => void;
    skipEnd: () => void;
    togglePlayPause: () => void;
    progressBar: React.RefObject<HTMLInputElement>;
    audioPlayer: React.RefObject<HTMLAudioElement>;
    isPlaying: boolean;
    duration: string;
    current: string;
    repeatMode: "one" | "all" | "off";
    setRepeatMode: React.Dispatch<React.SetStateAction<"one" | "all" | "off">>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type { IControls };