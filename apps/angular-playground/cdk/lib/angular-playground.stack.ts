import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class AngularPlaygroundStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const bucket: Bucket = new Bucket(this, 'angularPlaygroundAppBucket', {
            versioned: true,
            removalPolicy: RemovalPolicy.DESTROY,
            websiteIndexDocument: 'index.html',
            publicReadAccess: true,
        });

        new BucketDeployment(this, 'Deploy', {
            sources: [Source.asset('../../../dist/apps/angular-playground')],
            destinationBucket: bucket,
        });
    }
}
