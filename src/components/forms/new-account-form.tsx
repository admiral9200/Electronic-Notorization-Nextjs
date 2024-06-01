import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { StudentAccountForm } from "../account/student-account-form"
import Link from "next/link"
import { DEFAULT_REDIRECT_TO_STUDENT_DASHBOARD } from "@/config/defaults"

export function NewAccountForm() {
    return (
        <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="institution">Institution</TabsTrigger>
                <TabsTrigger value="government">Government</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
                <Card>
                    <CardHeader>
                        <Link href={DEFAULT_REDIRECT_TO_STUDENT_DASHBOARD}>
                            <Button >Next</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <StudentAccountForm />
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
