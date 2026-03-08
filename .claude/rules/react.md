## Components

- Use components from the shadcn/ui library as much as possible when creating/modifying components (see https://ui.shadcn.com/ for a list of available components).

- When necessary, create reusable components and functions to reduce code duplication.

- **NEVER** create more than one component in the same file. Each component should have its own file.

- Before creating a new component, **ALWAYS** use Context7 to check if a shadcn/ui component already exists that can be used. If one exists, install it.

- **ALWAYS** use the shadcn/ui `Button` component (`@/components/ui/button`) for buttons. **NEVER** use native `<button>` directly.

## Forms

- ALWAYS use Zod for form validation.

- Always use React Hook Form for form creation and validation. Always use the @components/ui/form.tsx component to create forms.

Example form:

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Styling

- **NEVER** use hard-coded Tailwind colors (such as `text-white`, `text-white/70`, `bg-black`, `bg-white`, `text-black`, `border-[#f1f1f1]`, `bg-[#2b54ff]`, `bg-[oklch(...)]` etc.). **ALWAYS** use the theme colors defined in @app/globals.css (e.g., `text-background`, `text-background/70`, `bg-foreground`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `border-border` etc.). If the required color does not exist in the theme, create a new CSS variable in @app/globals.css following the existing pattern.

- Before creating a new color variable, **ALWAYS** check the shadcn/ui documentation for theming and see if it's really necessary.

- **ALWAYS** check which components can be reused to build a page in @components/ui/page.tsx.

## Authentication

- **NEVER** use middleware for authentication verification. **ALWAYS** perform session verification on the page itself using `authClient.useSession()`.

- Protected pages should redirect to `/auth` if the user is not logged in.

- The login page (`/auth`) should redirect to `/` if the user is already logged in.

## Images

- **ALWAYS** use the `Image` component from Next to render images.