import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Vocabulary } from "./vocabulary.entity";
import { GroupedVocabList } from "./groupedVocabList.entity";

@Entity()
export class VocabularyGroupedVocabListLookupTable {
  @PrimaryColumn()
  vocabularyId: number;
  
  @PrimaryColumn()
  groupedVocabListid: number;
  
  @ManyToOne(() => Vocabulary)
  @JoinColumn({ name: 'vocabularyId' })
  vocabulary: Vocabulary;
  
  @ManyToOne(() => GroupedVocabList)
  @JoinColumn({ name: 'groupedVocabListid' })
  groupedVocabList: GroupedVocabList;
}