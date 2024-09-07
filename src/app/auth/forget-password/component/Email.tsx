"use client";

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

import { emailSchema } from "@/lib/zod-schema/emailSchema";
import { emailType } from "@/lib/zod-type/emailType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface EmailProps {
  onSubmit: (data: emailType) => void;
}

const Email: React.FC<EmailProps> = ({ onSubmit }) => {
  const form = useForm<emailType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="w-full text-center">
          <p className="font-bold">Forgot Password</p>
          <p className="font-normal">
            Enter Email used to register your account
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-white" type="submit">
            Complete
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Email;
