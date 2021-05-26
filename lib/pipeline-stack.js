"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopPipelineStack = void 0;
const cdk = require("@aws-cdk/core");
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const pipelines_1 = require("@aws-cdk/pipelines");
const core_1 = require("@aws-cdk/core");
const pipeline_satge_1 = require("./pipeline-satge");
class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id);
        const sourceArtifact = new codepipeline.Artifact();
        const cloudAssemblyArtifact = new codepipeline.Artifact();
        const pipelineDev = new pipelines_1.CdkPipeline(this, "PipelineDev", {
            pipelineName: "WorkshopPipelineDev",
            cloudAssemblyArtifact,
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: "GitHub",
                output: sourceArtifact,
                oauthToken: core_1.SecretValue.secretsManager("CDK-Pipeline-test-github-token"),
                branch: "dev",
                owner: "binums",
                repo: "cdk-pipeline-test"
            }),
            synthAction: pipelines_1.SimpleSynthAction.standardNpmSynth({
                sourceArtifact,
                cloudAssemblyArtifact,
                buildCommand: "npm run build",
                synthCommand: "cdk synth --context stageName=dev"
            })
        });
        const deployDev = new pipeline_satge_1.WorkshopPipelineStage(this, "DeployDev");
        pipelineDev.addApplicationStage(deployDev);
        const pipelineProd = new pipelines_1.CdkPipeline(this, "PipelineProd", {
            pipelineName: "WorkshopPipelineProd",
            cloudAssemblyArtifact,
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: "GitHub",
                output: sourceArtifact,
                oauthToken: core_1.SecretValue.secretsManager("CDK-Pipeline-test-github-token"),
                branch: "main",
                owner: "binums",
                repo: "cdk-pipeline-test"
            }),
            synthAction: pipelines_1.SimpleSynthAction.standardNpmSynth({
                sourceArtifact,
                cloudAssemblyArtifact,
                buildCommand: "npm run build",
                synthCommand: "cdk synth --context stageName=prod"
            })
        });
        const deployProd = new pipeline_satge_1.WorkshopPipelineStage(this, "DeployProd");
        pipelineProd.addApplicationStage(deployProd);
    }
}
exports.WorkshopPipelineStack = WorkshopPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsMERBQTBEO0FBQzFELDBFQUEwRTtBQUMxRSxrREFBb0U7QUFDcEUsd0NBQTRDO0FBQzVDLHFEQUF5RDtBQUV6RCxNQUFhLHFCQUFzQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ25ELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbkUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLGNBQWMsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuRCxNQUFNLHFCQUFxQixHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTFELE1BQU0sV0FBVyxHQUFHLElBQUksdUJBQVcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3hELFlBQVksRUFBRSxxQkFBcUI7WUFDbkMscUJBQXFCO1lBRXJCLFlBQVksRUFBRSxJQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO2dCQUN6RCxVQUFVLEVBQUUsUUFBUTtnQkFDcEIsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLFVBQVUsRUFBRSxrQkFBVyxDQUFDLGNBQWMsQ0FDckMsZ0NBQWdDLENBQ2hDO2dCQUNELE1BQU0sRUFBRSxLQUFLO2dCQUNiLEtBQUssRUFBRSxRQUFRO2dCQUNmLElBQUksRUFBRSxtQkFBbUI7YUFDekIsQ0FBQztZQUVGLFdBQVcsRUFBRSw2QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDL0MsY0FBYztnQkFDZCxxQkFBcUI7Z0JBQ3JCLFlBQVksRUFBRSxlQUFlO2dCQUM3QixZQUFZLEVBQUUsbUNBQW1DO2FBQ2pELENBQUM7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFNBQVMsR0FBRyxJQUFJLHNDQUFxQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUUvRCxXQUFXLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0MsTUFBTSxZQUFZLEdBQUcsSUFBSSx1QkFBVyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDMUQsWUFBWSxFQUFFLHNCQUFzQjtZQUNwQyxxQkFBcUI7WUFFckIsWUFBWSxFQUFFLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3pELFVBQVUsRUFBRSxRQUFRO2dCQUNwQixNQUFNLEVBQUUsY0FBYztnQkFDdEIsVUFBVSxFQUFFLGtCQUFXLENBQUMsY0FBYyxDQUNyQyxnQ0FBZ0MsQ0FDaEM7Z0JBQ0QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsSUFBSSxFQUFFLG1CQUFtQjthQUN6QixDQUFDO1lBRUYsV0FBVyxFQUFFLDZCQUFpQixDQUFDLGdCQUFnQixDQUFDO2dCQUMvQyxjQUFjO2dCQUNkLHFCQUFxQjtnQkFDckIsWUFBWSxFQUFFLGVBQWU7Z0JBQzdCLFlBQVksRUFBRSxvQ0FBb0M7YUFDbEQsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLElBQUksc0NBQXFCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRWpFLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0Q7QUE3REQsc0RBNkRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjb2RlcGlwZWxpbmUgZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmVcIjtcbmltcG9ydCAqIGFzIGNvZGVwaXBlbGluZV9hY3Rpb25zIGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lLWFjdGlvbnNcIjtcbmltcG9ydCB7IENka1BpcGVsaW5lLCBTaW1wbGVTeW50aEFjdGlvbiB9IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7IFNlY3JldFZhbHVlIH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IFdvcmtzaG9wUGlwZWxpbmVTdGFnZSB9IGZyb20gXCIuL3BpcGVsaW5lLXNhdGdlXCI7XG5cbmV4cG9ydCBjbGFzcyBXb3Jrc2hvcFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuXHRjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuXHRcdHN1cGVyKHNjb3BlLCBpZCk7XG5cblx0XHRjb25zdCBzb3VyY2VBcnRpZmFjdCA9IG5ldyBjb2RlcGlwZWxpbmUuQXJ0aWZhY3QoKTtcblx0XHRjb25zdCBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG5cblx0XHRjb25zdCBwaXBlbGluZURldiA9IG5ldyBDZGtQaXBlbGluZSh0aGlzLCBcIlBpcGVsaW5lRGV2XCIsIHtcblx0XHRcdHBpcGVsaW5lTmFtZTogXCJXb3Jrc2hvcFBpcGVsaW5lRGV2XCIsXG5cdFx0XHRjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG5cblx0XHRcdHNvdXJjZUFjdGlvbjogbmV3IGNvZGVwaXBlbGluZV9hY3Rpb25zLkdpdEh1YlNvdXJjZUFjdGlvbih7XG5cdFx0XHRcdGFjdGlvbk5hbWU6IFwiR2l0SHViXCIsXG5cdFx0XHRcdG91dHB1dDogc291cmNlQXJ0aWZhY3QsXG5cdFx0XHRcdG9hdXRoVG9rZW46IFNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKFxuXHRcdFx0XHRcdFwiQ0RLLVBpcGVsaW5lLXRlc3QtZ2l0aHViLXRva2VuXCJcblx0XHRcdFx0KSxcblx0XHRcdFx0YnJhbmNoOiBcImRldlwiLFxuXHRcdFx0XHRvd25lcjogXCJiaW51bXNcIixcblx0XHRcdFx0cmVwbzogXCJjZGstcGlwZWxpbmUtdGVzdFwiXG5cdFx0XHR9KSxcblxuXHRcdFx0c3ludGhBY3Rpb246IFNpbXBsZVN5bnRoQWN0aW9uLnN0YW5kYXJkTnBtU3ludGgoe1xuXHRcdFx0XHRzb3VyY2VBcnRpZmFjdCxcblx0XHRcdFx0Y2xvdWRBc3NlbWJseUFydGlmYWN0LFxuXHRcdFx0XHRidWlsZENvbW1hbmQ6IFwibnBtIHJ1biBidWlsZFwiLFxuXHRcdFx0XHRzeW50aENvbW1hbmQ6IFwiY2RrIHN5bnRoIC0tY29udGV4dCBzdGFnZU5hbWU9ZGV2XCJcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZXBsb3lEZXYgPSBuZXcgV29ya3Nob3BQaXBlbGluZVN0YWdlKHRoaXMsIFwiRGVwbG95RGV2XCIpO1xuXG5cdFx0cGlwZWxpbmVEZXYuYWRkQXBwbGljYXRpb25TdGFnZShkZXBsb3lEZXYpO1xuXG5cdFx0Y29uc3QgcGlwZWxpbmVQcm9kID0gbmV3IENka1BpcGVsaW5lKHRoaXMsIFwiUGlwZWxpbmVQcm9kXCIsIHtcblx0XHRcdHBpcGVsaW5lTmFtZTogXCJXb3Jrc2hvcFBpcGVsaW5lUHJvZFwiLFxuXHRcdFx0Y2xvdWRBc3NlbWJseUFydGlmYWN0LFxuXG5cdFx0XHRzb3VyY2VBY3Rpb246IG5ldyBjb2RlcGlwZWxpbmVfYWN0aW9ucy5HaXRIdWJTb3VyY2VBY3Rpb24oe1xuXHRcdFx0XHRhY3Rpb25OYW1lOiBcIkdpdEh1YlwiLFxuXHRcdFx0XHRvdXRwdXQ6IHNvdXJjZUFydGlmYWN0LFxuXHRcdFx0XHRvYXV0aFRva2VuOiBTZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcihcblx0XHRcdFx0XHRcIkNESy1QaXBlbGluZS10ZXN0LWdpdGh1Yi10b2tlblwiXG5cdFx0XHRcdCksXG5cdFx0XHRcdGJyYW5jaDogXCJtYWluXCIsXG5cdFx0XHRcdG93bmVyOiBcImJpbnVtc1wiLFxuXHRcdFx0XHRyZXBvOiBcImNkay1waXBlbGluZS10ZXN0XCJcblx0XHRcdH0pLFxuXG5cdFx0XHRzeW50aEFjdGlvbjogU2ltcGxlU3ludGhBY3Rpb24uc3RhbmRhcmROcG1TeW50aCh7XG5cdFx0XHRcdHNvdXJjZUFydGlmYWN0LFxuXHRcdFx0XHRjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG5cdFx0XHRcdGJ1aWxkQ29tbWFuZDogXCJucG0gcnVuIGJ1aWxkXCIsXG5cdFx0XHRcdHN5bnRoQ29tbWFuZDogXCJjZGsgc3ludGggLS1jb250ZXh0IHN0YWdlTmFtZT1wcm9kXCJcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZXBsb3lQcm9kID0gbmV3IFdvcmtzaG9wUGlwZWxpbmVTdGFnZSh0aGlzLCBcIkRlcGxveVByb2RcIik7XG5cblx0XHRwaXBlbGluZVByb2QuYWRkQXBwbGljYXRpb25TdGFnZShkZXBsb3lQcm9kKTtcblx0fVxufVxuIl19