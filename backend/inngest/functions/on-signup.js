import { NonRetriableError } from "inngest";
import User from '../../models/user.js'
import { inngest } from '../client.js'
import { sendMail } from "../../utils/mailer.js";

export const onUserSignup = inngest.createFunction(
    { id: "on-user-signup", retries: 2 }, // key
    { event: "user/signup" }, // triggerring the event in inngest
    async ({ event, step }) => {
        try {
            const { email } = event.data

            // pipeline 1: get the user email from DB
            const user = await step.run("get-user-email", async () => {
                const userObject = await User.findOne({ email })
                if (!userObject) {
                    throw new NonRetriableError('User no longer exists in our DB')
                }
                console.log('checking what user object is:',userObject)
                return userObject // returning things here 
            })

            // pipeline 2: sens the welcome msg to user via nodemail
            await step.run('send-welcome-email', async () => {
                const subject = `Welcome to LabSync`
                const message = `Hi,
                \n\n 
                Thanks,for signing up. We're glad to have you onboard!`

                await sendMail(user.email, subject, message)
            })
            
            console.log('mail sent successfully!!!')
            return { success: true }


        } catch (error) {
            console.log('Error in step from onSignup', error.message)
        }
    }
);



