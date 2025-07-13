import { inngest, NonRetriableError } from "inngest";
import User from '../../models/user.model.js'

export const onUserSignup = inngest.createfunction(
    { id: "on-user-signup", retries: 2 },
    { event: "user/signup" },
    async ({ event, step }) => {
        try {
            const { email } = event.data

            // pipeline 1
            await step.run("get-user-email", async () => {
                const userObject = await User.findOne({ email })
                if (!userObject) {
                    throw new NonRetriableError('User no longer exists in our DB')
                }
                return userObject // returning things here 
            })

            // pipeline 2
            await step.run('send-welcome-email', async () => {
                const subject = `Welcome to DoubtDrop`
                const message = `Hi,
                \n\n 
                Thanks,for signing useOptimistic. We're glad to have you onboard!`

                await sendMail(user.email, subject, message)
            })

            return { success: true }


        } catch (error) {
            console.log('Error in step from onSignup', error.message)
        }
    }
);