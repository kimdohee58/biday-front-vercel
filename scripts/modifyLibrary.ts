import path from "path";
import * as fs from "node:fs";

interface Modification {
    filePath: string;
    searchValue: string | RegExp;
}

const modifications: Modification[] = [
    {
        filePath: "../node_modules/@material-tailwind/react/components/Dialog/DialogBody.d.ts",
        searchValue: "",
    }
];

const modifyFiles = () => {
    modifications.forEach(({filePath, searchValue}) => {
        const resolvedPath = path.resolve(__dirname, filePath);
        try {
            let content = fs.readFileSync(resolvedPath, "utf-8");

            content = content.replace(searchValue, "");

            fs.writeFileSync(resolvedPath, content, "utf-8");
            console.log(`${resolvedPath} 파일에서 구문이 성공적으로 삭제되었습니다.`);
        } catch (error) {
            console.error(`${resolvedPath} 파일 수정 중 오류 발생:`, error);
            process.exit(1);
        }
    });
};

modifyFiles();