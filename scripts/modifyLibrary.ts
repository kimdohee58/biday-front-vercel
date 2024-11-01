const path = require("path");
const fs = require("node:fs");

interface Modification {
    filePath: string;
    searchValues: (string | RegExp)[];
}

const modifications: Modification[] = [
    {
        filePath: "../node_modules/@material-tailwind/react/components/Avatar/index.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Typography/index.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Input/index.d.ts",
        searchValues: [
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
            /"crossOrigin"\s*\|?/g
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Select/index.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/IconButton/index.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Dialog/index.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
            /"handler"\s*\|?/g
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Dialog/DialogHeader.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Dialog/DialogBody.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Dialog/DialogFooter.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Button/index.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Card/index.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Card/CardHeader.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Card/CardBody.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
        ],
    },
    {
        filePath: "../node_modules/@material-tailwind/react/components/Card/CardFooter.d.ts",
        searchValues: [
            /"placeholder"\s*\|?/g,
            /"onPointerEnterCapture"\s*\|?/g,
            /"onPointerLeaveCapture"\s*\|?/g,
        ],
    },


];

const modifyFiles = () => {
    modifications.forEach(({filePath, searchValues}) => {
        const resolvedPath = path.resolve(__dirname, filePath);
        try {
            let content = fs.readFileSync(resolvedPath, "utf-8");

            searchValues.forEach((searchValue) => {
                content = content.replace(searchValue, "");
            })

            fs.writeFileSync(resolvedPath, content, "utf-8");
            console.log(`${resolvedPath} 파일 수정 완료.`);
        } catch (error) {
            console.error(`${resolvedPath} 파일 수정 중 오류 발생:`, error);
            process.exit(1);
        }
    });
};

modifyFiles();