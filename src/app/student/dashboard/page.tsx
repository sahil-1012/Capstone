import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getStudentGroupDetails } from '@/server/actions/getStudentGroupDetails';

const getStatusColor = (status: string) => {
  const colors = {
    Pending: 'bg-yellow-500',
    Approved: 'bg-green-500',
    Rejected: 'bg-red-500',
    Completed: 'bg-green-500',
    'In-progress': 'bg-blue-500',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

export default async function DashboardPage() {
  const { data: groupData } = await getStudentGroupDetails('STU001');

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Group Members</CardTitle>
            <CardDescription>Your project team members</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {groupData?.members.map((member) => (
                <Card key={member.studentId}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-gray-500">{member.studentId}</p>
                          <p className="text-sm text-gray-500">{member.officialEmailId}</p>
                        </div>
                        <Badge>Panel {member.panel}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.domains.map((domain: string) => (
                          <Badge key={domain} variant="outline">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Your project status and reviews</CardDescription>
            </div>
          </CardHeader>
          <CardContent>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Review 1</TableHead>
                  <TableHead>Review 2</TableHead>
                  <TableHead>Review 3</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {groupData?.projects?.map((project: { title: string; domain: string; status: string; review1: string; review2: string; review3: string;  }, index: string) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.domain}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(project.status || 'Pending')} text-white`} >
                        {project.status || 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(project?.review1 || '-')} text-white`} >
                        {project?.review1 || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(project?.review2 || '-')} text-white`} >
                        {project?.review2 || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(project?.review3 || '-')} text-white`} >
                        {project?.review3 || '-'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}