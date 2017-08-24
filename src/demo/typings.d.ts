/* SystemJS module definition */
import HLJSStatic = hljs.HLJSStatic;
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare let hljs: HLJSStatic;
