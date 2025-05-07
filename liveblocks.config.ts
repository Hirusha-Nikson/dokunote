declare global {
  interface Liveblocks {
    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        color: any;
      };
    };
  }
}

export {};