```mermaid
%%{init: {'flowchart': {'curve': 'linear'}}}%%
graph TD;
        __start__([<p>__start__</p>]):::first
        router(router)
        math(math)
        chat(chat)
        __end__([<p>__end__</p>]):::last
        __start__ --> router;
        chat --> __end__;
        math --> __end__;
        router -.-> math;
        router -.-> chat;
        classDef default fill:#f2f0ff,line-height:1.2;
        classDef first fill-opacity:0;
        classDef last fill:#bfb6fc;
```