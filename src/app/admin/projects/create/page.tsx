import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectForm } from "@/components/admin/ProjectForm"

export default function CreateProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Project</h1>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  )
}
