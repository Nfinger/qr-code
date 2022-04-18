import type { AxisOptions } from "react-charts";
import { Chart } from "react-charts";
import React from "react";

type Datum = { entry: string, count: number }

export default function Bar({ users }: { users: any }) {

    const data = users.reduce((prev: { [key: string]: number }, curr: any) => {
        if (prev[curr.entryPoint]) {
            prev[curr.entryPoint] += 1;
        } else {
            prev[curr.entryPoint] = 1;
        }
        return prev
    }, {})

    const chartData = React.useMemo(() => [
        {
            label: 'Other Victims',
            data: Object.keys(data).map((entry) => ({
                entry, count: data[entry]
            }))
        }
    ], [data])

    const primaryAxis = React.useMemo<
        AxisOptions<Datum>
    >(
        () => ({
            hardMin: 0,
            getValue: (datum) => datum.entry.toUpperCase(),
            elementType: 'bar',
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        (): AxisOptions<Datum>[] => [
            {
                hardMin: 0,
                getValue: (datum) => datum.count,
                elementType: 'bar',
            },
        ],
        []
    );

    return (
        <Chart
            options={{
                data: chartData,
                primaryAxis,
                secondaryAxes,
            }}
        />
    );
}