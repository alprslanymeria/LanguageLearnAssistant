*** (/) HOME PAGE ***

* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Page userId KULLANMIYOR
* Global Store:
    - Geldiğinde GlobalStore'un nasıl geldiği önemli değil.
    - Geldiğinde bir işlem yapılmaz.
    - Çıkarken useHomePageCustomEffect() içerisinde "resetExpect" ile unmount durumunda tüm değerler default değerlerine sıfırlanacak.
    - default




*** (/language/\[language]) LANGUAGE PAGE ***

* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR
    - handlePracticeClick
        - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
        - Loading (- , İşlem Kısa Sürüyor)
* Page userId KULLANMIYOR
* Global Store
    - Geldiğinde GlobalStore'un nasıl geldiği önemli değil.
    - Geldiğinde useLanguagePageCustomEffect() içerisinde "setLanguage" ile language set edilecek.
    - Çıkarken useLanguagePageCustomEffect() içerisinde "resetExpect" ile unmount durumunda aşağıdaki alanlar hariç geri kalan alanlar sıfırlanacak.
        - language







*** (/practice/\[practice]?language=<language>) PRACTICE PAGE ***

* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer YOK
* Handlers VAR
    - handleCreateClick
        - Try - Catch (- , Gerek Yok)
 		- Parametreler (+)
 		- Loading (- , İşlem Kısa Sürüyor)
* Page userId KULLANIYOR.
    - usePracticePageCustomEffect()
* Global Store
    - Geldiğinde "Language" dolu olmalıdır. Boş ise "/" yönlendirilmelidir. Bu kontrol usePracticePageCustomEffect() içerisinde yapılmalıdır.
    - Geldiğinde usePracticePageCustomEffect() içerisinde "setOldSessions" ile OldSessions, "setPractice" ile practice set edilir.
    - Çıkarken useCustomEffectThree() içerisinde "resetExpect" ile unmount durumunda aşağıdaki alanlar hariç geri kalan alanlar sıfırlanacak.
        - language
        - practice
        - OldSessions





*** (/detail?id=<id>) DETAIL PAGE ***

* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Page userId KULLANIYOR.
    - useDetailPageCustomEffect()
* Global Store
    - Geldiğinde "Language" - "Practice" - "OldSessions" dolu olmalıdır. Boş ise "/" yönlendirilmelidir. Bu kontrol useDetailPageCustomEffect() içerisinde yapılmalıdır.
    - Geldiğinde bir işlem yapılmaz.
    - Çıkarken useDetailPageCustomEffect() içerisinde "resetExpect" ile unmount durumunda aşağıdaki alanlar hariç geri kalan alanlar sıfırlanacak.
        - language
        - practice
        - OldSessions





*** (/create) CREATE PAGE ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer YOK
* Handlers VAR
    - handleSvgClick
        - Try - Catch (- , Gerek Yok)
 		- Parametreler (+)
 		- Loading (- , İşlem Kısa Sürüyor)
    - handleChoose
        - Try - Catch (+)
 		- Parametreler (+)
 		- Loading (+)
* Page userId KULLANIYOR
    - useCreatePageCustomEffect()
    - BUTON
        - handleChoose()
        - handleChoose iki durumda disabled olacak:
            - isLoading && loadingSource === "ChooseHandler"
            - status === "loading"
        - handleChoose tek durumda spin gösterilecek:
            - isLoading && loadingSource === "ChooseHandler"
* Global Store
    - Geldiğinde "Language" - "Practice" - "OldSessions" dolu olmalıdır. Boş ise "/" yönlendirilmelidir. Bu kontrol useCreatePageCustomEffect() içerisinde yapılmalıdır.
    - Geldiğinde useCreatePageCustomEffect() içerisinde "setCreateItems" ile CreateItems set edilir.
    - handlerChoose butonuna tıklandığı zaman "setOldSessionId" ile "OldSessionId" set edilir.
    - handleSvgClick işlevi çalıştığı zaman "setSelectedItemId" ile "SelectedItemId" set edilir.
    - Çıkarken useCreatePageCustomEffect() içerisinde "resetExpect" ile unmount durumunda aşağıdaki alanlar hariç geri kalan alanlar sıfırlanacak.
        - language
        - practice
        - OldSessions
        - CreateItems
        - OldSessionId
        - SelectedItemId




*** (/session?id=<>) SESSION PAGE ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRMİYOR.
    - Parametreler (+)
    - Try - Catch (- , Gerek Yok)
    - Loading (- , İşlem Kısa Sürüyor)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Page userId KULLANMIYOR
* Global Store
    - Geldiğinde "Language" - "Practice" - "OldSessions" - "OldSessionId" - "CreateItems", "SelectedItemId" dolu olmalıdır. Boş ise "/" yönlendirilmelidir. Bu kontrol useSessionPageCustomEffect() içerisinde yapılmalıdır.
    - Geldiğinde alt componentler içerisinde "updateSessionData" ile "SessionData" set edilir.
    - Çıkarken useSessionPageCustomEffect() içerisinde "resetExpect" ile unmount durumunda aşağıdaki alanlar hariç geri kalan alanlar sıfırlanacak.
        - language
        - practice
        - OldSessions
        - CreateItems
        - OldSessionId
        - SelectedItemId
        - SessionData




*** (/auth/login) LOGIN PAGE ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRMİYOR.
    - Parametreler (+)
    - Try - Catch (- , Gerek Yok)
    - Loading (- , İşlem Kısa Sürüyor)
    - Bağımlılıklar (+)
* prop.d.ts
* Reducer
* Handlers VAR
    - handleSubmit
        - Try - Catch (- , Gerek Yok)
 		- Parametreler (+)
 		- Loading (+)
* Page userId KULLANMIYOR.
* Global Store
    - Geldiğinde GlobalStore'un nasıl geldiği önemli değil.
    - Geldiğinde bir işlem yapılmaz.
    - Çıkarken useSignupPageCustomEffect() içerisinde "resetExpect" ile unmount durumunda tüm değerler default değerlerine sıfırlanacak.
        - default


*** (/auth/signup) SIGNUP PAGE ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR
    - handleSubmit
        - Try - Catch (- , Gerek Yok)
 		- Parametreler (+)
 		- Loading (+)
* Page userId KULLANMIYOR.
* Global Store
    - Geldiğinde GlobalStore'un nasıl geldiği önemli değil.
    - Geldiğinde bir işlem yapılmaz.
    - Çıkarken useSignupPageCustomEffect() içerisinde "resetExpect" ile unmount durumunda tüm değerler default değerlerine sıfırlanacak.
        - default




*** (/edit) EDIT PAGE ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRMİYOR.
    - Parametreler (+)
    - Try - Catch (- , Gerek Yok)
    - Loading (- , İşlem Kısa Sürüyor)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Page userId KULLANMIYOR.
* Global Store
    - Geldiğinde GlobalStore'un nasıl geldiği önemli değil.
    - Geldiğinde bir işlem yapılmaz.
    - Çıkarken bir işlem yapılmaz. Geldiği gibi çıkar.




*** (/list) LIST PAGE ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Page userId KULLANMIYOR.
* Global Store
    - Geldiğinde GlobalStore'un nasıl geldiği önemli değil.
    - Geldiğinde bir işlem yapılmaz.
    - Çıkarken bir işlem yapılmaz. Geldiği gibi çıkar.




*** (/add) ADD PAGE ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRMİYOR.
    - Parametreler (+)
    - Try - Catch (- , Gerek Yok)
    - Loading (- , İşlem Kısa Sürüyor)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Page userId KULLANMIYOR.
* Global Store
    - Geldiğinde GlobalStore'un nasıl geldiği önemli değil.
    - Geldiğinde bir işlem yapılmaz.
    - Çıkarken bir işlem yapılmaz. Geldiği gibi çıkar.



*** (/profile) PROFILE PAGE ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Page userId KULLANIYOR
    - useProfilePageCustomEffect()
    - BUTON
        - SaveProfileInfos Action Metot
        - SaveProfileInfos iki durumda disabled olacak:
            - isPending
            - status === "loading"
        - handleChoose tek durumda spin gösterilecek:
            - isPending
* Global Store
    - Geldiğinde GlobalStore'un nasıl geldiği önemli değil.
    - Geldiğinde bir işlem yapılmaz.
    - Çıkarken bir işlem yapılmaz. Geldiği gibi çıkar.








LOGOUT YAPILAN YERLERDE DEFAULT DEĞERİNE SIFIRLANIR.
- EmailComponent ve MenuComponent içerisinde logout signOut işlemi gerçekleşiyor.
- İkisinde de resetExcept() ile default değerlerine sıfırlanacak.







-------------------------------------------------------  COMPONENTLER -------------------------------------------------


*** ALERT COMPONENT ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRMİYOR.
    - Parametreler (+)
    - Try - Catch (- , Gerek Yok)
    - Loading (- , İşlem kısa sürüyor)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Component userId kullanmıyor.



*** FLAG COMPONENT ***
* USE EFFECT YOK
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR
    - handleFlagClick
        - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
        - Loading (- , İşlem kısa sürüyor)
    - handle StartClick
        - Try - Catch (+)
        - Parametreler (+)
        - Loading (+)
* Component userId KULLANIYOR.
	- BUTON
		- handleStartClick kullanıyor.

		- handleStartClick iki durumda disabled olacak:
			- userId != authenticated
			- isLoading || loadingSource === "HandleStartClick"

		- handleStartClick tek durumda loading spin gösterilecek:
        	- isLoading || loadingSource === "HandleStartClick"






*** FLASHCARD ADD OR EDIT COMPONENT ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Parametreler (+)
    - Try - Catch (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK.
* Component userId KULLANIYOR.
	- BUTON
		- FlashcardCategoryAddOrUpdate useAction kullanıyor.

		- FlashcardCategoryAddOrUpdate iki durumda disabled olacak:
			- isPending true
			- status === "loading"

		- FlashcardCategoryAddOrUpdate tek durumda loading spin gösterilecek:
			- isPending true




*** FLASHCARD SESSION COMPONENT ***
* USE EFFECT VAR, İŞLEM LOADİNG GEREKTİRMİYOR.
    - Try - Catch (- , Gerek Yok)
    - Parametreler (+)
    - Loading (- , İşlem kısa sürüyor)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Component userId kullanmıyor.




*** FLASHCARD FORM COMPONENT ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRMİYOR.
    - Try - Catch (- , Gerek Yok)
    - Parametreler (+)
    - Loading (- , İşlem kısa sürüyor)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer YOK
* Handlers VAR
	- handleClick
		- Try - Catch (+)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
	- handleNextClick
		- Try - Catch (+)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
	- handleCloseClick
		- Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
* Component userId KULLANIYOR.
	- BUTON
		- handleCloseClick kullanıyor.

		- handleCloseClick iki durumda disabled olacak:
			- isLoading \&\& loadingSource === "HandleCloseClick"
			- status === "loading"

		- handleCloseClick tek durumda loading spin gösterilecek:
			- isLoading \&\& loadingSource === "HandleCloseClick"




*** READING ADD OR EDIT COMPONENT ***
USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Try - Catch (+)
    - Parametreler (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR
	- handleFileChangeOne
		- Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
	- handleFileChangeTwo
		- Try - Catch (+)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
* Component userId kullanıyor.
	- BUTON
		- ReadingAddOrUpdate useAction kullanıyor.

		- ReadingAddOrUpdate iki durumda disabled olacak:
			- isPending true
			- status === "loading"

		- ReadingAddOrUpdate tek durumda loading spin gösterilecek:
			- isPending true





*** READING SESSION COMPONENT ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Try - Catch (+)
    - Parametreler (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR
    - convertBlobToBase64
        - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
* Component userId KULLANMIYOR




*** READING FORM COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts UPDATED
* Reducer YOK
* Handlers VAR
    - handleTextSelection
        - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
    - handleTranslate
        - Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
    - calculateRate
        - Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
    - closeAndSave
        - Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
* Component userId kullanıyor:
    - BUTON
		- handleTranslate kullanıyor

		- handleTranslate iki durumda disabled olacak:
			- isLoading \&\& loadingSource === "ReadingHandleTranslate"
			- status === "loading"
		- handleTranslate tek durumda loading spin gösterilecek:
			- isLoading \&\& loadingSource === "ReadingHandleTranslate"


		- calculateRate kullanıyor

		- calculateRate tek durumda disabled olacak:
			- isLoading \&\& loadingSource === "ReadingCalculateRate"
        - calculateRate tek durumda loading spin gösterilecek:
			- isLoading \&\& loadingSource === "ReadingCalculateRate"	
	

		- closeAndSave kullanıyor

		- closeAndSave iki durumda disabled olacak:
			- isLoading \&\& loadingSource === "ReadingCloseAndSave"
			- status === "loading"
		- closeAndSave tek durumda loading spin gösterilecek:
			- isLoading \&\& loadingSource === "ReadingCloseAndSave"




*** WRITING ADD OR EDIT COMPONENT ***
*  USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Try - Catch (+)
    - Parametreler (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR.
    - handleFileChangeOne
        - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
    - handleFileChangeTwo
        - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
* Component userId kullanıyor.
	- BUTON
		- WritingAddOrUpdate useAction kullanıyor.

		- WritingAddOrUpdate iki durumda disabled olacak:
			- isPending true
			- status === "loading"
		- WritingAddOrUpdate tek durumda loading spin gösterilecek:
			- isPending true





*** WRITING SESSION COMPONENT ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Try - Catch (+)
    - Parametreler (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR
    - convertBlobToBase64
        - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
* Component userId KULLANMIYOR





*** WRITING FORM COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts UPDATED
* Reducer YOK
* Handlers VAR:
    - handleTextSelection
        - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
    - handleTranslate
        - Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
    - calculateRate
        - Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
    - closeAndSave
        - Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
* Component userId KULLANIYOR.
    - BUTON
* Component userId kullanıyor:
	- BUTON
		- handleTranslate kullanıyor

		- handleTranslate iki durumda disabled olacak:
			- isLoading \&\& loadingSource === "WritingHandleTranslate"
			- status === "loading"
		- handleTranslate tek durumda loading spin gösterilecek:
			- isLoading \&\& loadingSource === "WritingHandleTranslate"


		- calculateRate kullanıyor
		
        - calculateRate tek durumda disabled olacak:
			- isLoading \&\& loadingSource === "WritingCalculateRate"
		- calculateRate tek durumda loading spin gösterilecek:
			- isLoading \&\& loadingSource === "WritingCalculateRate"	

	
        - closeAndSave kullanıyor

		- closeAndSave iki durumda disabled olacak:
			- isLoading \&\& loadingSource === "WritingCloseAndSave"
			- status === "loading"
		- closeAndSave tek durumda loading spin gösterilecek:
			- isLoading \&\& loadingSource === "WritingCloseAndSave"


*** LISTENING SESSION COMPONENT ***




*** LISTENING FORM COMPONENT ***





*** WORD ADD OR EDIT COMPONENT ***
* USE EFFECT VAR, İŞLEM LOADING GEREKTİRİYOR.
    - Try - Catch (+)
    - Parametreler (+)
    - Loading (+)
    - Bağımlılıklar (+)
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers YOK
* Component userId KULLANIYOR
    - BUTON
        - DeckWordAddOrUpdate useAction kullanıyor.

        
		- DeckWordAddOrUpdate iki durumda disabled olacak:
            - isPending true
            - status === "loading"
        - DeckWordAddOrUpdate tek durumda loading spin gösterilecek:
            - isPending true



*** INFO MESSAGE COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts UPDATED
* Reducer YOK
* Handlers YOK
* Component userId KULLANMIYOR



*** LIST TABLE COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts UPDATED
* Reducer YOK
* Handlers VAR
	- handleCreate
		- Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
	- handleEdit
	    - Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
	- handleDelete
		- Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
* Component userId KULLANMIYOR.





*** MENU COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR
	- handleLogout
		- Try - Catch (+)
        - Parametreler (+)
		- Loading (+)
	- handleIconClick
		- Try - Catch (- , Gerek Yok)
        - Parametreler (+)
		- Loading (- , İşlem kısa sürüyor)
*  Component userId KULLANIYOR.
	- BUTON
		- handleLogout kullanıyor

		- handleLogout tek durumda disabled olacak
			- isLoading \&\& loadingSource === "MenuHandleLogout"
		- handleLogout tek durumda loading spin gösterilecek
			- isLoading \&\& loadingSource === "MenuHandleLogout"





*** EMAIL COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts UPDATED
* Reducer UPDATED
* Handlers VAR
	- handleLogout
		- try/catch/finally kullandım.
		- işlem uzun sürüyor, loading kullandım.
		- parametrelerin null veya undefined olmayacağını garantiledim.
	- handleDropdownClick
		- try/catch/finally kullanmaya gerek yok.
		- işlem kısa sürüyor.
		- parametrelerin null veya undefined olmayacağını garantiledim.
* Component userId KULLANIYOR.
	- BUTON
		- handleLogout kullanıyor

		- handleLogout iki durumda disabled olacak:
			- isLoading \&\& loadingSource === "EmailHandleLogout"
			- status === "loading"
		- handleLogout tek durumda spin gösterilecek
			- isLoading \&\& loadingSource === "EmailHandleLogout"





*** NAVBAR COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts YOK
* Reducer YOK
* Handlers YOK
* Component userId KULLANMIYOR.





*** PAGINATION COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts YOK
* Reducer YOK
* Handlers YOK
* Component userId KULLANMIYOR.





*** TABLE COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts YOK
* Reducer YOK
* Handlers YOK
* Component userId KULLANMIYOR.





*** LOADER COMPONENT ***
* USE EFFECT YOK.
* prop.d.ts YOK
* Reducer YOK
* Handlers YOK
* Component userId KULLANMIYOR.S





------------------------------------------------- ACTIONS ----------------------------------------------------------







*** GET LANGUAGES: ***

* Tek Tip Response Check		(+)
* Tek Tip Props Check			(- , parametre almıyor)
* Parametre Check With Zod	 	(- , parametre almıyor)
* Status Code Check			    (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - Dil Uzunuğu 0 Olabilir.	(+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** COMPARE LANGUAGE ID: ***

* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - User olmayabilir          (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)



*** GET ITEM BY ID ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - readingBookItem olmayabilir       (+)
    - writingBookItem olmayabilir       (+)
    - flashcardCategoryItem olmayabilir (+)
    - flashcardWordsItem olmayabilir    (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** DELETE BY ID ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - rbook olmayabilir         (+)
    - wbook olmayabilir         (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** READING ADD OR UPDATE ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(- , useAction kullanıldığı için farklı tanımladım.)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - practice olmayabilir               (+)
    - existingRecord olmayabilir         (+)
    - existingReadingBook olmayabilir    (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** WRITING ADD OR UPDATE ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(- , useAction kullanıldığı için farklı tanımladım.)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - practice olmayabilir               (+)
    - existingRecord olmayabilir         (+)
    - existingWritingBook olmayabilir    (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** DECK WORD ADD OR UPDATE ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(- , useAction kullanıldığı için farklı tanımladım.)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - existingDeckWord olmayabilir    (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** FLASHCARD CATEGORY ADD OR UPDATE ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(- , useAction kullanıldığı için farklı tanımladım.)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - practice olmayabilir                     (+)
    - existingFlashcardCategory olmayabilir    (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET ALL R BOOKS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET ALL W BOOKS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET ALL F CATEGORIES ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET ALL F CATEGORIES WITH PAGING ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET ALL F WORDS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** CREATE LIVE SESSION ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** DELETE LIVE SESSION ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET OLD SESSIONS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - Language Olmayabilir      (+)
    - Practice Olmayabilir      (+)
    - flashcardOldSessions Olmayabilir  (+)
    - readingOldSessions Olmayabilir    (+)
    - writingOldSessions Olmayabilir    (+)
    - listeningOldSessions Olmayabilir  (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** SAVE OLD SESSIONS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(- , Kompleks olduğu için yapmadım)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - flashcardOldSession Olmayabilir    (+)
    - readingOldSession Olmayabilir      (+)
    - writingOldSession Olmayabilir      (+)
    - listeningOldSession Olmayabilir    (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET PRACTICES ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - Language Olmayabilir      (+)
    - practices Olmayabilir     (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET PROFILE INFOS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - User Olmayabilir          (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** SAVE PROFILE INFOS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(- , useAction kullanıldığı için farklı tanımladım.)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - User olmayabilir          (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** CALCULATE RATE ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(- , Query yok)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET ROWS BY ID ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - HEPSİNİ YAPTIM
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** SAVE ROWS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(- , Kompleks olduğu için yapmadım)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - YOK
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** TRANSLATE TEXT ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - User olmayabilir (+)
    - Language olmayabilir (+)
    - Target language tanımlanmamış olabilir (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)


*** GET CREATE ITEMS ***
* Tek Tip Response Check		(+)
* Tek Tip Props Check			(+)
* Parametre Check With Zod		(+)
* Status Code Check             (+)
* TRY-CATCH Check			    (+)
* Performanslı Query			(+)
* Olasılıklar
    - Language Olmayabilir      (+)
    - practice Olmayabilir     (+)
* Log Error To Console			(+)
* Open Telemetry Log			(-)
* Redis Cache				    (-)










COMPONENTLER VE LOADING GEREKTİREN USE EFFECT KULLANIMI
-----------------------------------------------------

PLAYER COMP. --> USE CUSTOM EFFECT ONE (+)
READING SESSION COMP. --> USE CUSTOM EFFECT ONE (+)
WRITING SESSION COMP. --> USE CUSTOM EFFECT ONE (+)
READING ADD OR EDIT COMP. --> USE CUSTOM EFFECT (+)
WRITING ADD OR EDIT COMP. --> USE CUSTOM EFFECT (+)
LISTENING ADD OR EDIT COMP. --> USE CUSTOM EFFECT (+)
FLASHCARD ADD OR EDIT COMP. --> USE CUSTOM EFFECT (+)
WORD ADD OR EDIT COMP. --> USE CUSTOM EFFECT (+)




COMPONENTLER VE LOADING GEREKTİREN HANDLER İŞLEMLERİ
-------------------------------------------------------


EMAIL COMP. --> handleLogout (+)
MENU COMP. --> handleLogout (+)
FLAG COMP. --> handleStartClick (+)
GAME COMP. --> handleCloseClick (+)
LISTENING FORM COMP. --> calculateRate , closeAndSave (+)
LIST TABLE COMP. --> handleDelete (+)
READING FORM COMP. --> handleTranslate , calculateRate , closeAndSave (+)
READING SESSION COMP. --> convertBlobToBase64 (Zaten useEffect içerisinde beklediği için tekrar bekletmedim.)
WRITING FORM COMP. --> handleTranslate , calculateRate , closeAndSave (+)
WRITING SESSION COMP. --> convertBlobToBase64 (Zaten useEffect içerisinde beklediği için tekrar bekletmedim.)





SAYFALAR VE LOADING GEREKTİREN USE EFFECT KULLANIMI 
---------------------------------------------------

SIGNUP PAGE --> USE ECUSTOM EFFECT TWO (+)
CREATE PAGE --> USE CUSTOM EFFECT THREE (+)
DETAIL PAGE --> USE CUSTOM EFFECT TWO (+)
LANGUAGE PAGE --> USE CUSTOM EFFECT TWO (+)
LIST PAGE --> USE CUSTOM EFFECT ONE (+)
PRACTICE PAGE --> USE CUSTOM EFFECT TWO (+)
PROFILE PAGE --> USE CUSTOM EFFECT ONE (+)
HOME PAGE --> USE CUSTOM EFFECT ONE (+)




SAYFALAR VE LOADING GEREKTİREN HANDLER İŞLEMLERİ
------------------------------------------------


CREATE PAGE --> chooseHandler (+)
LOGIN PAGE --> handleSubmit (+)
PROFILE PAGE --> handleSave (+)
SIGNUP PAGE --> handleSubmit (+)





NOT: Add altında bulunan component'ler useAction kullandığı için loading işlemi ona göre yapılacaktır. (+)