import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { StudentAccountForm } from "../account/student-account-form"
import Link from "next/link"
import { DEFAULT_REDIRECT_TO_INSTITUTION_DASHBOARD, DEFAULT_REDIRECT_TO_STUDENT_DASHBOARD } from "@/config/defaults"
import { InstitutionAccountForm } from "../account/institution-account-form"

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
                            <Button >Next Student Dashboard</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <StudentAccountForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="institution">
                <Card>
                    <CardHeader>
                        <Link href={DEFAULT_REDIRECT_TO_INSTITUTION_DASHBOARD}>
                            <Button >Next Institution Dashboard</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <InstitutionAccountForm />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
