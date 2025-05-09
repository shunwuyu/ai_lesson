import { Workflow, Step } from '@mastra/core/workflows';
import { isValid, z } from 'zod';

const startups = ['startupintell', 'initialstream']

const startupBasicInfo = [
    {
        name: 'startupintell',
        website: 'https://www.startupintell.com',
        founder: '王皓',
        oneliner: '软件创始人的启动与增长工具'
    },
    {
        name: 'initialstream',
        website: 'https://www.initialstream.com',
        founder: '张三',
        oneliner: 'SaaS 与AI应用的快速启动模式'
    }
];

const startupFinancial = [
    {
        name: 'startupintell',
        revenue: 1000000,
        funding: 1000000
    },
    {
        name: 'initialstream',
        revenue: 2000000,
        funding: 1000000
    }
]

const startupSocialMedia = [
    {
        name: 'startupintell',
        followers: 1000,
        likes: 1000,
        comments: 1000
    },
    {
        name: 'initialstream',
        followers: 2000,
        likes: 2000,
        comments: 2000
    }
]

const validationStep = new Step({
    id: 'validationStep',
    outputSchema: z.object({
        isValid: z.boolean().describe('Whether the startup name is valid')
    }),
    execute: async ({context}) => {
        const isValid = startups.includes(context.triggerData.startupName)
        return {
            isValid
        }
    }
})

const basicInfoStep = new Step({
    id: 'basicInfoStep',
    execute: async ({context}) => {
        const startup = startupBasicInfo.find(item => item.name === context.triggerData.startupName);
        return {
            startup
        }
    }
})

export const startupWorkflow = new Workflow({
    name: 'startup-workflow',
    triggerSchema: z.object({
        startupName: z.string().describe('The name of the startup')
    })
})

const financialStep = new Step({
    id: 'financialStep',
    execute: async ({context}) => {
        const startup = startupFinancial.find(item => item.name === context.triggerData.startupName)
        return {
            startup
        }
    }
})

const socialMediaStep = new Step({
    id: 'socialMediaStep',
    execute: async ({context}) => {
        const startup = startupSocialMedia.find(item => item.name === context.triggerData.startupName);
        return {
            startup
        }
    }
})

const approvalStep = new Step({
    id: 'approvalStep',
    execute: async ({context, suspend}) => {
        let isApproved = false;
        if (context.steps?.approvalStep?.status === 'success') {
            isApproved = context.steps.approvalStep.output.isApproved;
        }
        if (!isApproved) {
            await  suspend();
        }
        return {
            isApproved
        }
       
    }
})

startupWorkflow
    .step(validationStep)
    .then(basicInfoStep, {
        when: async ({context}) => {
            const validationStepresult = context.getStepResult<{isValid: boolean}>('validationStep');
            return validationStepresult?.isValid === true?true:false;
        }
    })
    .then(approvalStep)
    .after(approvalStep)
    .step(financialStep)
    .step(socialMediaStep)
    .commit()

