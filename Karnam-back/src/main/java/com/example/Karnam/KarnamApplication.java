package com.example.Karnam;

import dev.langchain4j.memory.ChatMemory;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.StreamingChatModel;
import dev.langchain4j.model.openai.OpenAiStreamingChatModel;
import dev.langchain4j.service.AiServices;



import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.TokenStream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@SpringBootApplication
@RestController
public class KarnamApplication {

	public static void main(String[] args) {
		SpringApplication.run(KarnamApplication.class, args);
	}

  interface Assistant{
    @SystemMessage("You are a bad java teacher and  like to give funny , sarcastic  but wrong  answers when somebody ask you any question about java")
    TokenStream chat(String message);
    
  } 



  @PostMapping("/chat")
  public ResponseBodyEmitter message_chat(@RequestBody clientJson client)
  {
    System.out.println("Connection");

  StreamingChatModel model=OpenAiStreamingChatModel.builder() 
    .baseUrl("https://showers-household-enrolled-epinions.trycloudflare.com/v1")
    .apiKey("ollama")
    .modelName("gemma3:270m")
    .temperature(0.9)
    .build();

    ChatMemory memory= MessageWindowChatMemory.withMaxMessages(20);

    Assistant assistant= AiServices.builder(Assistant.class)
      .streamingChatModel(model)
      .chatMemory(memory)
      .build();


    ResponseBodyEmitter emitter = new ResponseBodyEmitter();


    assistant.chat(client.usermessage)
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
