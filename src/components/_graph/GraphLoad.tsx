import { Screen } from "@/hooks/definitions";
import { MainWrapper } from "./GraphMainWrapper";
import { Header } from "./GraphLogoHeader";
import { Render } from "./GraphRenderScreen";
import { GraphContainer } from "./GraphBoxContainer";

export function Loading({ props }: { props: Screen }) {
    return (
        <MainWrapper props={props}>
            <Render props={props}>
                <Header>
                    Graphle
                </Header>
                <GraphContainer>
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold animate-pulse">
                        LOADING ...
                    </div>
                </GraphContainer>
            </Render>
        </MainWrapper>
    )
}