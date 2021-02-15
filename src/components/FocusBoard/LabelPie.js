import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector } from "react-redux";

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

    labelData = labelData.map((i, idx) => {
        if (hovered === idx) {
            i.color = "#000";
            return i;
        } else return i;
    });

    const lineWidth = 60;

    return (
        // <PieChart
        //     data={labelData}
        //     lineWidth={15}
        //     paddingAngle={18}
        //     rounded
        //     animate
        //     reveal
        //     label={({ dataEntry }) => dataEntry.value}
        //     labelStyle={(index) => ({
        //         fill: labelData[index].color,
        //         fontSize: "10px",
        //         fontWeight: "bold",
        //         fontFamily: "sans-serif",
        //     })}
        //     labelPosition={70}
        // />
        <PieChart
            style={{
                fontSize: "12px",
                fontWeight: "bold",
            }}
            data={labelData}
            radius={PieChart.defaultProps.radius - 6}
            lineWidth={lineWidth}
            segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
            segmentsShift={(index) => (index === selected ? 6 : 1)}
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
    );
}

//////////////////////////

// function FullOption() {

//     const data = props.data.map((entry, i) => {
//       if (hovered === i) {
//         return {
//           ...entry,
//           color: 'grey',
//         };
//       }
//       return entry;
//     });

//   }
