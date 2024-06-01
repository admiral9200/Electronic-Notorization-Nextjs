import React, { forwardRef, useImperativeHandle, useState } from "react"

/**
 * This component is used to upload users' photo in account form....
 * @returns JSX.Element
 */
export interface PhotoUploadFormRef {
    handlePhotoUpload: () => {}
}

interface PhotoUploadFormProps {

}

const PhotoUploadForm = forwardRef<PhotoUploadFormRef, PhotoUploadFormProps>((props, ref) => {
    const [logoPreview, setLogoPreview] = React.useState<string | null>(null)
    const [file, setFile] = useState<File>(new File([], ""))

    /**
     * This function handles change of logo....
     * @param event 
     */
    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e.target.files
            if (files && files.length > 0) {
                const file = files[0]
                const dataUrl = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        if (typeof reader.result === "string") {
                            resolve(reader.result)
                        } else {
                            reject(new Error("Failed to read files as data URL"))
                        }
                    }
                    reader.onerror = (error) => {
                        reject(error)
                    }
                    if (file) {
                        reader.readAsDataURL(file)
                        setFile(file)
                    }
                })
                setLogoPreview(dataUrl)

            }
        } catch (error) {
            console.log('Error handling logo change: ', error)
        }
    }

    /**
     * This function is used to handle upload button with element id...
     */
    const handleUploadButtonClick = (e: any) => {
        e.preventDefault()
        const fileInput = document.getElementById("logoInput")
        if (fileInput) {
            fileInput.click()
        }
    }


    /**
     * This function is used to handle upload a photo to server's public directory...
     */
    const handlePhotoUpload = async () => {
        try {
            const formObject = new FormData()
            formObject.append('profile_photo', file)

            const response = await fetch("/api/account", {
                method: "POST",
                body: formObject
            })

            if(!response.ok) {
                return null
            }

            return (await response.json()).data
        } catch(error) {
            console.error(error)
            throw new Error("Failed upload account photo")
        }
    }


    /**
     * This function is used to wrap the raw function as a required object...
     */
    useImperativeHandle(ref, () => {
        return {
            handlePhotoUpload
        }
    })

    return (
        <div className="bg-white rounded-md px-5 py-4 mt-6 flex justify-between items-center">
            <div className="flex space-x-4">
                <img className="w-20 h-20 rounded-full border border-white" src={logoPreview ? logoPreview : "/images/avatars/pjborowiecki.jpeg"} alt="Preview" />
            </div>
            <button className="text-gray-600 font-bold border border-gray-500 rounded-sm py-2 text-sm px-4 mr-2" onClick={handleUploadButtonClick}>Upload</button>
            <input type="file" id="logoInput" className="hidden" onChange={handleLogoChange} />
        </div>
    )
})


export default PhotoUploadForm