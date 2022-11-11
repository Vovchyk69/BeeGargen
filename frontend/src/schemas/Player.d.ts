type AudioItem = {
  src: string;
  title?: string;
};

type PlayerState = {
  status?: 'play' | 'pause' | 'stop' | string,
  audio?: HTMLAudioElement,
  data?: {
    src: string,
    img?: string,
    title?: string,
  }
}
