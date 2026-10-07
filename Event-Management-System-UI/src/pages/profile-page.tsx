import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function ProfilePage() {
  return (
    <div className="mx-auto max-w-[640px] space-y-5">
      <div>
        <h1 className="text-[22px] font-medium tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Organizer account used across the dashboard.</p>
      </div>
      <section className="rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src="https://avatars.githubusercontent.com/u/228327337?s=400&u=7771f111c916c993c625769ade2089c2aeac6315&v=4" alt="Samuel Wakili" />
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Uchenna Emmanuel</p>
            <p className="text-sm text-muted-foreground">dovadallas661@gmail.com</p>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" defaultValue="Uchenna Emmanuel" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="dovadallas661@gmail.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Event organizer" />
          </div>
          <Button onClick={() => toast.success("Profile updated")}>Update profile</Button>
        </div>
      </section>
    </div>
  )
}
