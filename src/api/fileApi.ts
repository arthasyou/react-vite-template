import type { S3PolicyResponse } from "@/models/s3Model";
import { request, upload } from "./base";

export const uploadFileApi = async (
	file: File,
	filename: string,
): Promise<string> => {
	const policy = await getS3PolicyApi();
	const formData = new FormData();

	// 填充 policy fields
	for (const [key, value] of Object.entries(policy.fields)) {
		formData.append(key, value);
	}

	// 添加文件字段
	formData.append("file", file);
	await upload(policy.url, formData);

	const resolvedKey = policy.fields.key.replace("${filename}", filename);

	// 拼接最终访问地址（默认直接拼接 key）
	return `${policy.url}/${resolvedKey}`;
};

const getS3PolicyApi = async (): Promise<S3PolicyResponse> => {
	const response = await request<undefined, S3PolicyResponse>({
		method: "GET",
		url: "/s3/policy",
		group: "files",
	});
	return response;
};
