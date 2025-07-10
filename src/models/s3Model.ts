export interface S3PolicyFields {
	key: string;
	policy: string;
	"x-amz-algorithm": string;
	"x-amz-credential": string;
	"x-amz-date": string;
	"x-amz-signature": string;
}

export interface S3PolicyResponse {
	fields: S3PolicyFields;
	url: string;
}
