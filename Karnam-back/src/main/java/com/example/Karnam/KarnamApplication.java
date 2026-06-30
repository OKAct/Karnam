package com.example.Karnam;

import dev.langchain4j.memory.ChatMemory;
import dev.langchain4j.memory.chat.TokenWindowChatMemory;
import dev.langchain4j.model.chat.StreamingChatModel;
import dev.langchain4j.model.openai.OpenAiStreamingChatModel;
import dev.langchain4j.model.openai.OpenAiTokenCountEstimator;
import dev.langchain4j.service.AiServices;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.TokenStream;
import static dev.langchain4j.model.openai.OpenAiChatModelName.GPT_4_O_MINI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;



@CrossOrigin("*")
@SpringBootApplication
@RestController
public class KarnamApplication {

	public static void main(String[] args) {
		SpringApplication.run(KarnamApplication.class, args);
	}

  interface Assistant{
    @SystemMessage("You are very helpful ai assistant made by Anand Yasheswi and make sure to tell everybody you were made by anand")
    TokenStream chat(String message);
    
  } 


  @GetMapping("/test")
  public String test(){

    return "Server working";
  }
  

  @PostMapping("/chat")
  public ResponseBodyEmitter message_chat(@RequestPart(value="client" ,required = false) clientJson client,@RequestPart(value="img",required = false) MultipartFile img)
  {

    System.out.println("Check");

    if(img!=null && !img.isEmpty()){

      System.out.println("image got");
      System.out.println(img.getName());
    }
    else{
      System.out.println("No image");
    }

   if(img!=null && !img.isEmpty()){

     OCR imageText= new OCR(img);

     String imgTxt=imageText.getText();

     System.out.println("Text from img:"+imgTxt);

     client.usermessage.append(imgTxt);

   } 

  StreamingChatModel model=OpenAiStreamingChatModel.builder() 
    .baseUrl("https://karnam.tail10621d.ts.net/v1")
    .apiKey("ollama")
    .modelName("gemma3:270m")
    .temperature(0.9)
    .build();



    ChatMemory memory=TokenWindowChatMemory.withMaxTokens(8000, new OpenAiTokenCountEstimator(GPT_4_O_MINI));
                                         

    Assistant assistant= AiServices.builder(Assistant.class)
      .streamingChatModel(model)
      .chatMemory(memory)
      .build();


    ResponseBodyEmitter emitter = new ResponseBodyEmitter();


    assistant.chat(client.usermessage.toString())
              .onPartialResponse(chunk->{
                try{
                emitter.send(chunk);
                }
                catch(Exception e){
                  emitter.completeWithError(e);
                }
              }) 
              .onError(error->emitter.completeWithError(error))
              .start();
    return emitter;
  }


  
}



