import { convertFromLaTeX } from 'nerdamer';

// I don't really like this function XD

export function formatGraphFunction(
    expression: string): (x: number) => number 
{
    try {
        const expr = convertFromLaTeX(expression)
        const fn = expr.buildFunction(['x'])

        return (x: number) => {
            try {
                const result = fn(x)
            
                if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
                    return NaN
                }
                return result
            } catch {
                return NaN;
            }
        }
    } catch {
        return () => NaN;
    }
}