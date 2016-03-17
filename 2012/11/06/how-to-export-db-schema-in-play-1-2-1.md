<div dir="ltr" style="text-align: left;" trbidi="on">So I am writing an application in Play 1.2.1  
And I want to use the cool [migrate module](http://www.playframework.org/modules/migrate). This means I need to start writing SQL now.  
And I am bad at it.. Sometimes I forget to put "OneToOne" and it takes me a while to see it  
I found it useful to tell hibernate to export the DB scheme, thus quickly finding out the problems.  
For this post I created the following models

<pre name="code" class="java">  
package models;  
import javax.persistence.Entity;  
import play.db.jpa.Model;  
@Entity  
public class Account extends Model{  
}  

package models;  
import javax.persistence.Entity;  
import play.db.jpa.Model;  
@Entity  
public class User extends Model{  
    public String username;  
    public String passowrd;  
    public Account account;  
}  
</pre>

And I replaced the Application.index action with the following code

<pre name="code" class="java">  
public static void index() throws IOException {  
        Ejb3Configuration cfg = new Ejb3Configuration();  
        cfg.setProperty( "hibernate.dialect", MySQLDialect.class.getCanonicalName());  
        cfg.addAnnotatedClass( User.class );  
        cfg.addAnnotatedClass( Account.class );  
        SchemaExport export = new SchemaExport( cfg.getHibernateConfiguration() );  

        File file = new File("tmp.sql");  
        export.setOutputFile( file.getAbsolutePath() );  
        export.setFormat( true );  
        export.setDelimiter( ";" );  
        export.create( false, false );  

        if ( !CollectionUtils.isEmpty( export.getExceptions() ) )  
        {  
            StringWriter writer = new StringWriter(  );  
            for ( Throwable t : (List<throwable>) export.getExceptions() ) {  
                t.printStackTrace( new PrintWriter( writer ) );  
                renderText( writer.getBuffer().toString() );  
            }  
        }  
        renderText( FileUtils.readFileToString( file ) );  
    }  
</throwable></pre>

As you can see, I am using the useful [SchemaExport](http://docs.jboss.org/hibernate/orm/3.5/api/org/hibernate/tool/hbm2ddl/SchemaExport.html) class provided by hibernate. You should really check this class out as it can also run SQL files.  

Running the above code gives me the following output

<pre class="sql" name="code">  

    drop table if exists Account;  

    drop table if exists User;  

    create table Account (  
        id bigint not null auto_increment,  
        primary key (id)  
    );  

    create table User (  
        id bigint not null auto_increment,  
        account tinyblob,  
        passowrd varchar(255),  
        username varchar(255),  
        primary key (id)  
    );  
</pre>

Which is exactly what I wanted  
</div>