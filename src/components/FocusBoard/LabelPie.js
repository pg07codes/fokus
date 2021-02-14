import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector } from "react-redux";

export function LabelPie() {
    const labels = useSelector((s) => s.tasks.labels);
    const totalTasksCount = useSelector((s) => s.tasks.taskArray.length);
    let labelledTasksCount = 0;
    const labelData = Object.keys(labels).reduce((filtered, i) => {
        if (labels[i].count > 0) {
            labelledTasksCount += labels[i].count;
            filtered.push({
                title: i,
                value: labels[i].count,
                color: labels[i].color,
            });
        }
        return filtered;
    }, []);

    if (totalTasksCount - labelledTasksCount > 0) {
        labelData.push({
            title: "No Label",
            value: totalTasksCount - labelledTasksCount,
            color: "#c1c1d7",
        });
    }

    return (
        <PieChart
            data={labelData}
            lineWidth={15}
            paddingAngle={18}
            rounded
            animate
            reveal
            label={({ dataEntry }) => dataEntry.value}
            labelStyle={(index) => ({
                fill: labelData[index].color,
                fontSize: "10px",
                fontWeight: "bold",
                fontFamily: "sans-serif",
            })}
            labelPosition={70}
        />
    );
}
