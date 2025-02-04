"use client"

// REACT & NEXT
import { useActionState, useState } from "react";
//COMPONENTS
import FileIcon from "@/src/components/svg/FileUpload"
//ACTIONS
import { AddOrUpdate } from "../actions/crud";
//TYPES
import { crudFormComponentPropTypes } from "../types/prop";
import ShowError from "./utils/showError";

export default function CrudFormComponent({formHeading, labelNames, isHidden, formData, setFormData, table, itemId, userId, type} : crudFormComponentPropTypes) {

    //ACTION
    const [state, formAction] = useActionState(AddOrUpdate, undefined)

    //STATES
    const [fileError, setFileError] = useState<string | null>("")

    //FUNCTIONS
    const handleFileChange1 = (e: any) => {

        const file = e.target.files[0];
        const maxSize = 50 * 1024 * 1024;
        const allowedTypes = [
        'image/png', 
        'image/jpeg', 
        'application/pdf',
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
        'video/webm'
        ];

        if (file) {
            if (file.size > maxSize) {
                setFileError('Dosya boyutu 50MB\'dan küçük olmalıdır');
                return;
            }

            if (!allowedTypes.includes(file.type)) {
                setFileError('Sadece PNG, JPG, PDF, MP4, MOV, AVI ve WebM dosyaları yükleyebilirsiniz');
                return;
            }

            setFileError('');
            setFormData({ ...formData, file1: file });
        }

    }

    const handleFileChange2 = (e : any) => {
        
        const file = e.target.files[0];
        const maxSize = 50 * 1024 * 1024;
        const allowedTypes = [
        'image/png', 
        'image/jpeg', 
        'application/pdf',
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
        'video/webm'
        ];

        if (file) {
            if (file.size > maxSize) {
                setFileError('Dosya boyutu 50MB\'dan küçük olmalıdır');
                return;
            }

            if (!allowedTypes.includes(file.type)) {
                setFileError('Sadece PNG, JPG, PDF, MP4, MOV, AVI ve WebM dosyaları yükleyebilirsiniz');
                return;
            }

            setFileError('');
            setFormData({ ...formData, file2: file });
        }
    }

    if(state?.status === 500) return <ShowError error={state.message} errorDetails={state.stackDetails}></ShowError>

    return (
    
        <div className="flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">{formHeading}</h2>
              <form action={formAction} className="space-y-6">
    
                {/* Hidden Areas */}
                <input type='hidden' name='type' value={type}></input>
                <input type='hidden' name='table' value={table ?? ""}></input>
                <input type='hidden' name='itemId' value={itemId ?? ""}></input>
                <input type='hidden' name='userId' value={userId ?? ""}></input>
    
    
                {/* LANGUAGE OPTIONS*/}
                {isHidden.at(0) && 
                <div>
                    <label 
                      htmlFor="languageId" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {labelNames.at(0)}
                    </label>
                    <select
                      id="languageId"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={formData.languageId}
                      name='languageId'
                      onChange={(e) => setFormData({...formData, languageId: e.target.value})}
                    >
                      <option value={1}>English</option>
                      <option value={2}>Turkish</option>
                      <option value={3}>German</option>
                      <option value={4}>Russian</option>
    
                    </select>
                </div>}
    
                {/* DECK CATEGORY FOR WORD */}
                {isHidden.at(1) && 
                <div>
                    <label 
                      htmlFor="wordCategoryId" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {labelNames.at(1)}
                    </label>
                    <select
                      id="wordCategoryId"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={formData.categoryId}
                      name='wordCategoryId'
                      onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                    >
                      {formData.categories.map( (category : any) => (
                        <option value={category.id}>{category.name}</option>
                      ))}
    
                    </select>
                </div>}
    
    
                {/* INPUT 1 */}
                {isHidden.at(2) &&
                <div>
                    <label 
                      htmlFor="input1" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {labelNames.at(2)}
                    </label>
                    <input
                      type="text"
                      id="input1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`${labelNames.at(2)} giriniz`}
                      value={formData.input1}
                      name='input1'
                      onChange={(e) => setFormData({...formData, input1: e.target.value})}
                    />
                </div>}
    
                {/* INPUT 2 */}
                {isHidden.at(3) &&
                <div>
                    <label 
                      htmlFor="input2" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {labelNames.at(3)}
                    </label>
                    <input
                      type="text"
                      id="input2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`${labelNames.at(3)} giriniz`}
                      value={formData.input2}
                      name='input2'
                      onChange={(e) => setFormData({...formData, input2: e.target.value})}
                    />
                </div>}
    
                {/* FILE 1*/}
                {isHidden.at(4) &&
                <div>
                  <label 
                    htmlFor="file" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {labelNames.at(4)}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                    <div className="space-y-1 flex flex-col items-center">
                        <FileIcon/>
                        <div className="flex text-sm text-gray-600">
                            <label
                            htmlFor="file1"
                            className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                            <span>Choose File</span>
                            <input
                                id="file1"
                                name="file1"
                                type="file"
                                // value={formData.file1}
                                className="sr-only"
                                accept=".png,.jpg,.jpeg,.pdf,.mp4,.mov,.avi,.webm"
                                onChange={handleFileChange1}
                            />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, PDF, MP4, MOV, AVI, WebM (max 50MB)
                        </p>
                        {fileError && (
                            <p className="text-xs text-red-500 mt-1">{fileError}</p>
                        )}
                        {formData.file1 && (
                            <p className="text-xs text-green-500 mt-1">
                            Seçilen dosya: {formData.file1.name}
                            </p>
                        )}
                    </div>
                  </div>
                </div>}
    
                {/* FILE 2*/}
                {isHidden.at(5) &&
                <div>
                  <label 
                    htmlFor="file" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {labelNames.at(5)}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                    <div className="space-y-1 flex flex-col items-center">
                        <FileIcon></FileIcon>
                        <div className="flex text-sm text-gray-600">
                            <label
                            htmlFor="file2"
                            className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                            <span>Choose File</span>
                            <input
                                id="file2"
                                name="file2"
                                type="file"
                                // value={formData.file2}
                                className="sr-only"
                                accept=".png,.jpg,.jpeg,.pdf,.mp4,.mov,.avi,.webm"
                                onChange={handleFileChange2}
                            />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, PDF, MP4, MOV, AVI, WebM (max 50MB)
                        </p>
                        {fileError && (
                            <p className="text-xs text-red-500 mt-1">{fileError}</p>
                        )}
                        {formData.file2 && (
                            <p className="text-xs text-green-500 mt-1">
                            Seçilen dosya: {formData.file2.name}
                            </p>
                        )}
                    </div>
                  </div>
                </div>}
    
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                {type}
                </button>
    
              </form>
              
            </div>
          </div>
        </div>
      );
}