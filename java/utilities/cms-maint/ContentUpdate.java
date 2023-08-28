/* Project to automate Content Management System.
 * June 5 2023:
 * Initial POC
 * ===========
 * 1. Read file X. 
 * 2. Parse file X into JSON Y
 * 3. Update JSON Y
 * 4. Overwrite file X using updated JSON Y
 */


import java.io.FileReader;
import java.io.FileWriter;
import java.io.BufferedReader; 
import java.io.BufferedWriter; 
import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher; 
import java.util.regex.Pattern; 
/**
 * This program demonstrates how to read characters from a text file.
 * @author www.codejava.net
 *
 */
@CrossOrigin(origins = "http://localhost:4200")
public class ContentUpdate {
 
    public static void processMenuTree(String menuTreeName, String category, String parentCategory,String newDate ) {
         menuTreeName = "/Users/shantanu/Documents/GitHub/fullstack/spring-boot/shan-cms-maintain/content_list_crud/src/main/java/com/cmslistadmin/content_list_crud/business/test-data/menu-tree.ts" ;
        
        ArrayList<String> processedLines = readAndEditMenuTree( menuTreeName,  category,  parentCategory, newDate);
        updateMenuTree(menuTreeName.replace(".ts","1.ts"), processedLines);
    }
    public static ArrayList<String> readAndEditMenuTree(String menuTreeName, String category, String parentCategory,String newDate ) {
        BufferedReader menuTreeReader ; 
        String line = "";
        ArrayList<String> lines = new ArrayList<String>();
        Pattern findMenuTreePattern = Pattern.compile("\\d{2}-\\d{2}-\\d{4}" );
        try {
            menuTreeReader = new BufferedReader(new  FileReader(menuTreeName));
             while ((line = menuTreeReader.readLine()) != null) {
                if (line.contains(category) && line.contains(parentCategory))
                {
                    Matcher findMenuTreeMatch = findMenuTreePattern.matcher(line) ;
                    if (findMenuTreeMatch.find()) {
                        line = findMenuTreeMatch.replaceFirst(newDate);
                        lines.add(String.format("%s\n",line));
                    }
                } else {
                    lines.add(String.format("%s\n",line));
                    
                }
               
            }
            menuTreeReader.close();
 
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return lines ;
    }
    public static void updateMenuTree(String menuTreeName, ArrayList<String> processedLines) {
        BufferedWriter menuTreeWriter = null ;
        try {
            menuTreeWriter =  new BufferedWriter(new FileWriter(menuTreeName)); 
            for (String processedLine: processedLines) {

                try {
                     menuTreeWriter.write(processedLine) ;
                } catch (IOException e) {
                    e.printStackTrace();
                    return ;
                }
            }
        
            menuTreeWriter.flush(); 
        }catch (IOException ioe) {
            ioe.printStackTrace();
         }
         finally
         { 
            try{
               if(menuTreeWriter!=null)
              
            menuTreeWriter.close();
            }catch(Exception ex){
                System.out.println("Error in closing the BufferedWriter"+ex);
             }
         }
    }
    
    public static void main(String[] args) {
        ContentUpdate.processMenuTree("menutree.ts", "- Q1 2023 onward","Shree Ganesh","06-05-2023"); 
       
    }
    
}