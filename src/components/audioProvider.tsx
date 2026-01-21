import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AudioBuffer, AudioBufferSourceNode, AudioContext as RNAudioContext } from "react-native-audio-api";

interface AudioPlayerContextType {
    // state
    isPlaying: boolean,
    duration: number,
    currentTrack: string,
    currentTime: number,
    // methods
    loadTrack: (uri: string, title: string) => Promise<void>,
    play: () => void,
    stop: () => void,
    pause: () => void,
    seek: (time: number) => void,

    setPlaybackRate: (rate: number) => void,
    setDetune: (cents: number) => void,
    setPlaybackFromSpeed: (speed: number) => void,
}

const AudioContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {

    // so i will create one audiocontext object for the whole app
    const audioContextRef = useRef<RNAudioContext | null>(null);
    // will also create one audio node object for output
    const bufferSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);

    const startTimeRef = useRef<number>(0);
    const pauseTimeRef = useRef<number>(0);

    // define some states
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTrack, setCurrentTrack] = useState("");
    const [currentTime, setCurrentTime] = useState(0);

    // for the transforms
    const [playbackRate, setPlaybackRate] = useState(0);
    const [detune, setDetune] = useState(0);

    // this on on init i guess
    useEffect(() => {
        // let mounted = true;
        const init = () => {
            audioContextRef.current = new RNAudioContext();
        }
        init();
        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    // // not sure bout this one - map speed to playback rate
    // useEffect(() => {
    //     const maxSpeed = 120;
    //     const minSpeed = 0;
    //     const maxRate = 1.5;
    //     const minRate = 0.5
    //     // i'll map 1.5 and 0.5 to these values respectively
    //     const playbackCalc = Math.trunc(speed) / maxSpeed + minRate;
    //     setPlaybackRate(playbackCalc);
    // }, [speed])

    const setPlaybackFromSpeed = useCallback((speed: number) => {
        const maxSpeed = 120;
        const minSpeed = 0;
        const maxRate = 1.5;
        const minRate = 0.5
        // i'll map 1.5 and 0.5 to these values respectively
        const playbackCalc = Math.trunc(speed) / maxSpeed + minRate;
        setPlaybackRate(playbackCalc);
    }, [])

    const loadTrack = useCallback(async (uri: string, title: string) => {
        try {
            if (!audioContextRef.current) {
                console.warn("AudioContext not initialized");
                return;
            }
            const response = await fetch(uri);
            if (!response.ok) {
                throw new Error(`Failed to fetch audio: ${response.status}`);
            }
            // console.log(1)
            const arrayBuffer = await response.arrayBuffer();
            // console.log(2)
            const decoded = await audioContextRef.current.decodeAudioData(arrayBuffer);
            // console.log(3)
            audioBufferRef.current = decoded;

            // set the current track and duration
            setCurrentTrack(title)
            setDuration(decoded.duration)

            setCurrentTime(0);
            pauseTimeRef.current = 0;
            stop();
            play();
        }
        catch (err) {
            console.warn("error loading track", err);
        }
    }, [])

    const stop = useCallback(() => {
        if (bufferSourceRef.current) {
            bufferSourceRef.current.onEnded = null //Prevent onEnded feorm firing on manual stop
            bufferSourceRef.current.stop();
            bufferSourceRef.current = null;
        }
        setIsPlaying(false);
    }, [])


    const play = useCallback(async () => {
        // make sure we are initialized
        const ctx = audioContextRef.current;
        if (!ctx || !audioBufferRef.current) {
            return;
        }

        // if already playing do nothing
        if (bufferSourceRef.current) {
            return;
        }
        const source = await ctx.createBufferSource();

        source.buffer = audioBufferRef.current;
        source.playbackRate.value = playbackRate;
        source.detune.value = detune;
        // source.loop = loop;
        // source.loopStart = loopStart;
        // source.loopEnd = loopEnd;

        await ctx.resume();
        source.connect(ctx.destination);

        const offset = pauseTimeRef.current;
        source.start(0, offset);

        startTimeRef.current = ctx.currentTime;
        bufferSourceRef.current = source;
        setIsPlaying(true);

        source.onEnded = () => {
            if (source === bufferSourceRef.current) {
                bufferSourceRef.current = null;
                setIsPlaying(false);
            }
        }
    }, [])

    const pause = useCallback(() => {
        if (!bufferSourceRef.current || !audioContextRef.current) {
            return;
        }
        // Calculate where we are in the audio
        const elapsed = audioContextRef.current.currentTime - startTimeRef.current;
        pauseTimeRef.current = pauseTimeRef.current + elapsed;
        setCurrentTime(pauseTimeRef.current);

        // Stop the current source
        stop();
    }, []);

    const seek = useCallback((time: number) => {
        const wasPlaying = isPlaying;
        stop();
        // need to recalculate pausetime 
        pauseTimeRef.current = Math.max(0, Math.min(time, duration));
        setCurrentTime(pauseTimeRef.current);

        if (wasPlaying) {
            // Resume playing from new position
            play();
        }
    }, [isPlaying, duration, play]);

    // slider
    useEffect(() => {
        if (!isPlaying) {
            return;
        }
        // Update current time periodically while playing
        const intervalId = setInterval(() => {
            // if we have something playing
            if (audioContextRef.current && bufferSourceRef.current) {
                const elapsed = audioContextRef.current.currentTime - startTimeRef.current;
                const newTime = pauseTimeRef.current + elapsed;

                // Don't exceed duration
                if (newTime < duration) {
                    setCurrentTime(newTime);
                }
            }
        }, 100); // Update every 100ms 

        return () => {
            clearInterval(intervalId);
        };

    }, [isPlaying, duration]);

    // effects
    useEffect(() => {
        const source = bufferSourceRef.current;
        const ctx = audioContextRef.current;
        if (!source || !ctx) {
            return;
        }

        const RAMP_TIME = 0.05;

        source.playbackRate.setValueAtTime(
            playbackRate,
            ctx.currentTime + RAMP_TIME
        );
        source.detune.setValueAtTime(
            detune,
            ctx.currentTime + RAMP_TIME
        );


    }, [playbackRate, detune])


    const value: AudioPlayerContextType = {
        isPlaying,
        // isLoading,
        currentTrack,
        duration,
        currentTime,
        // playbackRate,
        // detune,
        loadTrack,
        play,
        pause,
        stop,
        seek,
        setPlaybackRate,
        setDetune,
        setPlaybackFromSpeed
    };
    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}

// export this as a custom hook
// i think we can do { thing } = useAudio() to grab it
export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return context;
}