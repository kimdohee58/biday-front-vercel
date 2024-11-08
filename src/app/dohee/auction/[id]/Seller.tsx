import React from "react";
import {Avatar, Card, CardBody, CardHeader, Typography,} from "@material-tailwind/react";
import {UserModel} from "@/model/user/user.model";

interface StatsPropsType {
    title: string;
    value: string;
    details: string;
}

function Stats({ title, value, details}: StatsPropsType) {
    return (
        <div>
            <Typography variant="small" className="font-normal text-gray-600">
                {title}
            </Typography>
            <Typography color="blue-gray" variant="h5">
                {value}
            </Typography>
            <Typography variant="small" className="font-normal text-gray-600">
                {details}
            </Typography>
        </div>
    );
}

const STATS_DATA = [
    {
        title: "Earnings Overview",
        value: "$5,120.00",
        details: "+15% from last month",
    },
    {
        title: "Projects Completed",
        value: "501",
        details: "+10% from last month",
    },
    {
        title: "Apps Designed",
        value: "25",
        details: "+10% from last month",
    },
    {
        title: "Workshops",
        value: "25",
        details: "+10% from last month",
    },
];

function UserProfile5({user}: { user: UserModel}) {
    return (
        <section className="container mx-auto px-8 py-10">
            <Card
                shadow={false}
                className="border border-gray-300 rounded-2xl"
            >
                <CardHeader shadow={false} className="rounded-none p-1">
                    <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Avatar src="/img/avatar1.jpg" alt="avatar" variant="rounded"/>
                            <div>
                                <Typography color="blue-gray" variant="h6">
                                    {user.name}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-gray-600"
                                >
                                    {user.email}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <hr className="pb-5"/>
                    <div className="grid gap-6 lg:grid-cols-4 items-center md:grid-cols-2 grid-cols-1">
                        {STATS_DATA.map((props, key) => (
                            <Stats key={key} {...props} />
                        ))}
                    </div>
                </CardBody>
            </Card>
        </section>
    );
}

export default UserProfile5;