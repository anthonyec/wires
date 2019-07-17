export type Connection = {
  from: {
    uid: string;
    prop: string;
  },
  to: {
    uid: string;
    prop: string;
  }
}

export type Connections = Connection[];
