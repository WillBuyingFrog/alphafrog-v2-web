'use client';

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";

import { useState, useEffect } from "react";

import { alphafrogDataInstance } from "@/axios/af-data-instance";
import { TableColumn, TableHeader, TableRow, TableCell, TableBody, Table } from "@nextui-org/table";



export default function DomesticFundAccounting() {

    const [files, setFiles] = useState<File[]>([]);
    const [message, setMessage] = useState<string>('');
    const [taskId, setTaskId] = useState<string | null>(null);
    const [identifiedTransactions, setIdentifiedTransactions] = useState<any[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData();
      files.forEach((file: File, index: number) => {
          formData.append('images', file);
      });

      try {
        const response = await alphafrogDataInstance.post('alpharecord/create_records', formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          },
        });

        setMessage(response.data.message);
        setTaskId(response.data.task_id);
        alert('ok!\n');
      } catch (error) {
        console.log(error);
        setMessage('Upload failed');
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFiles(Array.from(event.target.files));
      }
    };

    // 定时获取任务状态
    useEffect(() => {
      if (taskId) {
        const interval = setInterval(async () => {
          const response = await alphafrogDataInstance.get(`domestic/tasks/check-task-status?task_id=${taskId}`);
          if(response.status === 200){
            console.log(response.data);
            setMessage(response.data.result.progress);
            if(response.data.state === 'SUCCESS'){
              setIdentifiedTransactions(response.data.result.transaction_results)
              clearInterval(interval);
            }
          }else{
            setMessage('Task failed');
          }
        }, 2000);
        
        // 下面这行代表component卸载时清除定时器
        return () => clearInterval(interval);
      }
    }, [taskId]);
    
    

    return (
        <div className="justify-center w-[800px]">
          <div className="w-[500px]">
            <Card>
              <CardBody>
                <h1 className="text-2xl font-bold mb-5">上传基金购买截图</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <Input
                      type="file"
                      name="images"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-4">
                    <Button type="submit" color="primary">
                      Upload
                    </Button>
                  </div>
                  
                </form>
                {message && <p>{message}</p>}
              </CardBody>
            </Card>
            
        </div>
        <div className="w-full">
        {identifiedTransactions.length > 0 && (
              <Card>
                <CardBody>
                  <Table>
                    <TableHeader>
                      <TableColumn>
                        No.
                      </TableColumn>
                      <TableColumn>
                        申购日期
                      </TableColumn>
                      <TableColumn>
                        基金名称
                      </TableColumn>
                      <TableColumn>
                        基金代码
                      </TableColumn>
                      <TableColumn>
                        购买平台
                      </TableColumn>
                      <TableColumn>
                        申购份额
                      </TableColumn>
                      <TableColumn>
                        申购金额
                      </TableColumn>
                      <TableColumn>
                        申购净值
                      </TableColumn>
                      <TableColumn>
                        手续费
                      </TableColumn>
                    </TableHeader>
                    <TableBody>
                      {identifiedTransactions.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{transaction.time}</TableCell>
                          <TableCell>{transaction.fund_database_name}</TableCell>
                          <TableCell>{transaction.ts_code}</TableCell>
                          <TableCell>{transaction.platform}</TableCell>
                          <TableCell>{transaction.shares}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.nav}</TableCell>
                          <TableCell>{transaction.fee}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            )}
        </div>
      </div>
    )
}
