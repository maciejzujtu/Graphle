'use client'
import { Loading } from "@/components/_graph/GraphLoad";
import { GraphContainer } from "@/components/_graph/GraphBoxContainer";
import { DrawGraph } from "@/components/_graph/GraphDraw";
import { EndCard } from "@/components/_graph/GraphEndCard";
import { InputWrapper } from "@/components/_graph/GraphInputWrapper";
import { Header } from "@/components/_graph/GraphLogoHeader";
import { MainWrapper } from "@/components/_graph/GraphMainWrapper";
import { Render } from "@/components/_graph/GraphRenderScreen";
import { Bar } from "@/components/_graph/GraphSearchBar";
import { Handler } from "@/hooks/__graphHandler/handler";

export default function() {
    const { currentSize, currentGraphFunctions, currentStatus, isLoading,
            disableBar, currentUserInput, currentCSS, currentPlaceholder,
            toggleGraphFunction, handleChange, handleKeyDown } = Handler()

    if (isLoading) {
        return (
            <Loading props={currentSize} />
        )
    }
    
    return (
        <MainWrapper props={currentSize}>
            <Render props={currentSize}>            
                <Header>Graphle</Header>
                <EndCard
                    hasGameEnded={currentStatus}
                />
                <GraphContainer>
                    <DrawGraph functions={currentGraphFunctions} />
                </GraphContainer>
                <InputWrapper 
                    functions={currentGraphFunctions} 
                    onToggle={toggleGraphFunction}
                >
                    <Bar 
                        disableBar={disableBar}
                        currentUserInput={currentUserInput}
                        handleChange={handleChange}
                        handleKeyDown={handleKeyDown}
                        currentCSS={currentCSS}
                        currentPlaceholder={currentPlaceholder}
                    />
                </InputWrapper>
            </Render> 
        </MainWrapper>
    )
}