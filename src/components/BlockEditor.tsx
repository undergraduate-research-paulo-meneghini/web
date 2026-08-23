import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import api from "../services/api";

interface BlockEditorProps {
  initialContent?: any;
  onChange: (content: any) => void;
}

export default function BlockEditor({ initialContent, onChange }: BlockEditorProps) {
  
  // Função para fazer o upload da imagem pro backend
  const uploadFile = async (file: File) => {
    const body = new FormData();
    body.append("file", file);

    const response = await api.post("/uploads", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  };

  // Cria a instância do editor, populando com o conteúdo inicial se existir e configurando o upload
  const editor = useCreateBlockNote({
    initialContent: initialContent ? initialContent : undefined,
    uploadFile,
  });

  // Atualiza o parent component quando o conteúdo muda
  const handleChange = () => {
    if (editor) {
      onChange(editor.document);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md min-h-[300px] w-full mt-2 bg-white text-black">
      <div className="p-4 bg-gray-50 border-b border-gray-200 text-sm text-gray-500 rounded-t-md">
        Comece a escrever... pressione / para adicionar um bloco ou arraste uma imagem aqui.
      </div>
      <div className="p-4">
        <BlockNoteView
          editor={editor}
          onChange={handleChange}
          theme="light"
        />
      </div>
    </div>
  );
}
