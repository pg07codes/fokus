import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { EmptyLabelPie } from "./EmptyLabelPie";

export function LabelPie() {
    const labels = useSelector((s) => s.tasks.labels);
    const totalTasksCount = useSelector((s) => s.tasks.taskArray.length);

    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState(undefined);

    let labelledTasksCount = 0;

    let labelData = Object.keys(labels).reduce((filtered, i) => {
        if (labels[i].count > 0) {
            labelledTasksCount += labels[i].count;
            filtered.push({
                tooltip: `#${i} - ${labels[i].count} tasks`,
                value: labels[i].count,
                color: labels[i].color,
            });
        }
        return filtered;
    }, []);

    if (totalTasksCount - labelledTasksCount > 0) {
        labelData.push({
            tooltip: `No Label - ${totalTasksCount - labelledTasksCount} tasks`,
            value: totalTasksCount - labelledTasksCount,
            color: "#4F4F4F",
        });
    }

    labelData = labelData.map((i, idx) => {
        if (hovered === idx) {
            i.color = "#FABB18";
            return i;
        } else return i;
    });

    const lineWidth = 60;

    return (
        <div style={{ width: 130 }} data-tip="" data-for="LabelPieChart">
            {labelledTasksCount !== 0 ? (
                <PieChart
                    style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}
                    data={labelData}
                    radius={PieChart.defaultProps.radius - 6}
                    lineWidth={lineWidth}
                    segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                    segmentsShift={2}
                    animate
                    label={({ dataEntry }) => dataEntry.value}
                    labelPosition={100 - lineWidth / 2}
                    labelStyle={{
                        fill: "#fff",
                        pointerEvents: "none",
                    }}
                    onClick={(_, index) => {
                        setSelected(index === selected ? undefined : index);
                    }}
                    onMouseOver={(_, index) => {
                        setHovered(index);
                    }}
                    onMouseOut={() => {
                        setHovered(undefined);
                    }}
                />
            ) : (
                <EmptyLabelPie />
            )}
            <ReactTooltip id="LabelPieChart" getContent={() => (typeof hovered === "number" ? labelData[hovered].tooltip : null)} />
        </div>
    );
}
