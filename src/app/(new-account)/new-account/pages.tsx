"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

function NewAccount() {

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchInstitutions() {
  //     try {
  //       // Assuming getInstitutions() is a function that fetches institutions
  //       const institutionsData = await getInstitutions();
  //       setInstitutions(institutionsData);
  //     } catch (err) {
  //       setError('Failed to fetch institutions');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchInstitutions();
  // }, []);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("logoInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your form submission logic here
  };

  return (
    <div className='py-10 sm:px-32'>
        <h2 className='text-3xl font-bold'>Create New Account:</h2>

      <div>
        <div className='pb-12'>
          <h2 className='text-2xl font-bold'>Account Settings:</h2>
          <div className="bg-white rounded-md px-5 py-4 mt-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <img className="w-20 h-20 rounded-full border border-white" src={logoPreview ? logoPreview : "/images/avatars/pjborowiecki.jpeg"} alt="Preview" />
              <div className="pt-3">
                <h3 className="text-xl font-bold text-black">John Doe</h3>
                <p className="text-black text-sm">View Profile</p>
              </div>
            </div>
            <button className="text-gray-600 font-bold border border-gray-500 rounded-sm py-2 text-sm px-4 mr-2" onClick={handleUploadButtonClick}>Upload</button>
            <input type="file" id="logoInput" className="hidden" onChange={handleLogoChange} />
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form className="grid w-full gap-8" onSubmit={handleSubmit}>
          <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl className="h-12">
                    <Input className="border-white border placeholder:text-white" type="text" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage className="pt-2 sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl className="h-12">
                    <Input className="border-white border placeholder:text-white" type="string" placeholder="Smith" {...field} />
                  </FormControl>
                  <FormMessage className="pt-2 sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className="h-12">
                    <Input className="border-white border placeholder:text-white" type="email" placeholder="john@smith.com" {...field} />
                  </FormControl>
                  <FormMessage className="pt-2 sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="h-12">
                    <Input className="border-white border placeholder:text-white" type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage className="pt-2 sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
            <FormField
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl className="h-12">
                    <Input className="border-white border placeholder:text-white" type="text" placeholder="2618 Ocala Street Orlando Florida 32809 United States" {...field} />
                  </FormControl>
                  <FormMessage className="pt-2 sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              name="institutionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl className="h-12">
                    <Select value={String(field.value)} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a university" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {institutions.map((institution: Institution) => (
                          <SelectItem key={institution.id} value={String(institution.id)}>
                            {institution.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="pt-2 sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl className="h-12">
                    <Select value={String(field.value)} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Role.STUDENT}>{Role.STUDENT}</SelectItem>
                        <SelectItem value={Role.INSTITUTION}>{Role.INSTITUTION}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="pt-2 sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="outline"
            className="h-14 border bg-gradient-to-br from-pink-600/70 to-purple-400/70 text-lg font-bold tracking-wide hover:opacity-70"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default NewAccount
