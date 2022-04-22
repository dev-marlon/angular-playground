import { aws_s3 as s3, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class CdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const bucket: s3.Bucket = new s3.Bucket(
            this,
            'angularPlaygroundAppBucket',
            {
                versioned: true,
                removalPolicy: RemovalPolicy.DESTROY,
                websiteIndexDocument: 'index.html',
                publicReadAccess: true,
            }
        );

        new s3deploy.BucketDeployment(this, 'Deploy', {
            sources: [
                s3deploy.Source.asset('../../../dist/apps/angular-playground'),
            ],
            destinationBucket: bucket,
        });
    }
}
