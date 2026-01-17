import Cog6Tooth from '@/components/icons/Cog6Tooth'
import { EdgeProps, getBezierPath } from '@xyflow/react'
import React, { useEffect, useRef } from 'react'

const NodeEdgeCustom = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    label
}: EdgeProps) => {

    // get Bezier Path
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    })

    // Ref
    const gearRef = useRef<SVGSVGElement>(null)

    // Animation icon
    useEffect(() => {
        const gear = gearRef.current;
        if (!gear) return;

        let angle = 0;
        const animate = () => {
            angle += 4;
            gear.style.transform = `rotate(${angle}deg)`;
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return (
        <>

            {/* Line */}
            <path id={id} style={style} className='stroke-blue-600' d={edgePath} fill='none' strokeWidth={2} />

            {/* Label + output detail */}
            {label && (
                <foreignObject x={labelX - 55} y={labelY + 5} width={110} height={50}>
                    <div className="flex flex-col items-center text-xs text-white">
                        <div className="bg-white text-black border border-blue-600 rounded p-1 mt-1 flex">
                            status : <span className={`${label === "success" ? "text-green-500" : ''} ${label === "failure" ? "text-red-500" : ''} ${label === "retry" ? "text-gray-500" : ''} ml-1 font-bold`}>{label}</span>
                        </div>
                    </div>
                </foreignObject>
            )}

            {/* Gear Icon */}
            <foreignObject x={labelX - 13} y={labelY - 25} width={30} height={30}>
                <div className="w-6 h-6 rounded-full flex bg-blue-600 justify-center items-center">
                    <Cog6Tooth ref={gearRef} className="text-white w-5 h-5" />
                </div>
            </foreignObject>

        </>
    )
}

export default NodeEdgeCustom