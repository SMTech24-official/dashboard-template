import { Select } from "antd";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface LineGraphProps {
    selectOptions: { value: string; label: string }[];
    handleFilterChange: (value: string) => void;
    selectedData: Array<{
        day: string;
        Booking: number;
        Clinicians: number;
        Location: number;
        Services: number;
    }>;
    defaultValue: string;
    lineConfigs: Array<{
        dataKey: string;
        stroke: string;
    }>;
}

const LineGraph = ({
    selectOptions,
    handleFilterChange,
    selectedData,
    defaultValue,
    lineConfigs
}: LineGraphProps) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Overview</h2>
                <Select
                    defaultValue={defaultValue}
                    onChange={handleFilterChange}
                    options={selectOptions}
                    className="w-40"
                />
            </div>

            <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedData}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {lineConfigs.map((line) => (
                            <Line
                                key={line.dataKey}
                                type="monotone"
                                dataKey={line.dataKey}
                                stroke={line.stroke}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineGraph;