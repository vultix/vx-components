interface SassResult {
  text: string;
}

class Sass {
  static setWorkerUrl(url: string): void;

  compile(compile: string, options: any, callback: (result: SassResult) => void): void;
  compile(compile: string, callback: (result: SassResult) => void): void;

  destroy(): void;

  options(options: any): void;
}

declare var SassExport = Sass;
export = SassExport;
