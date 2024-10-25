import { Button, Typography } from "@material-tailwind/react";
import Card, {
    CardBody,
    CardFooter,
    CardHeader,
} from "@material-tailwind/react/components/Card";

export function ProductCardSkeleton() {
    return (
        <Card className="relative flex flex-col bg-transparent w-full max-w-xs mx-auto animate-pulse">
            <CardHeader
                shadow={false}
                floated={false}
                className="relative flex-shrink-0 h-64 w-full rounded-3xl overflow-hidden bg-gray-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-12 w-12 text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                    />
                </svg>
            </CardHeader>
            <CardBody className="p-4 space-y-4">
                <Typography
                    as="div"
                    variant="h1"
                    className="h-3 w-56 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="h-2 w-full rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="h-2 w-full rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="h-2 w-full rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    disabled
                    tabIndex={-1}
                    className="h-8 w-20 bg-gray-300"
                >
                    &nbsp;
                </Button>
            </CardFooter>
        </Card>
    );
}
