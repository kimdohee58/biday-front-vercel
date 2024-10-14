import {testAPI} from "@/api/test/test.api";

export default async function TestPage() {
    await testAPI.cacheTest();
};