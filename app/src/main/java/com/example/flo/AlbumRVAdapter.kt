package com.example.flo

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.flo.databinding.ItemAlbumBinding

class AlbumRVAdapter(private val albumList: ArrayList<Album>) :
        RecyclerView.Adapter<AlbumRVAdapter.ViewHolder>(){

    // 클릭 인터페이스를 정의
    interface MyItemClickListener{
        fun onItemClick(album: Album)
        fun onRemoveAlbum(position: Int)
    }

    // 클릭 리스너 선언
    private lateinit var mItemClickListener: MyItemClickListener

    // 클릭 리스너 등록 메서드 (메인 액티비티에서 inner Class로 호출)
    fun setMyItemClickListener(itemClickListener: MyItemClickListener){
        mItemClickListener = itemClickListener
    }

    // 뷰홀더 생성해주는 함수 => 처음에 몇 번만 호출됨
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): AlbumRVAdapter.ViewHolder {
        val binding: ItemAlbumBinding = ItemAlbumBinding.inflate(LayoutInflater.from(viewGroup.context), viewGroup, false)

        return ViewHolder(binding)
    }

    // 뷰홀더에 Data 를 binding 위아래로 스크롤 할 때마다 엄청나게 호출
    // 뷰홀더가 매개변수로 들어와서 자식뷰에 접근가능 => 데이터 바인딩
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(albumList[position])
//        holder.binding.itemTodayMusicAlbumImgPlayIv.setOnClickListener {  }
        holder.itemView.setOnClickListener { mItemClickListener.onItemClick(albumList[position]) }
//        holder.binding.itemAlbumTitleTv.setOnClickListener { mItemClickListener.onRemoveAlbum(po]]]]]]ㅁ]sition) }
    }

    fun addItems(albums: ArrayList<Album>) {
        albumList.clear()
        albumList.addAll(albums)
        notifyDataSetChanged()
    }

    fun addItem(album: Album) {
        albumList.add(album)
        notifyDataSetChanged()
    }

    fun removeItems() {
        albumList.clear()
        notifyDataSetChanged()
    }

    fun removeItem(position: Int) {
        albumList.removeAt(position)
        notifyDataSetChanged()
    }

    // 데이터가 Size 가 뭔지 => 마지막이 언제인지를 알 수 있음
    override fun getItemCount() = albumList.size

    inner class ViewHolder(val binding: ItemAlbumBinding): RecyclerView.ViewHolder(binding.root){

        fun bind(album: Album){
            binding.itemAlbumTitleTv.text = album.title
            binding.itemAlbumSingerTv.text = album.singer
            binding.itemAlbumCoverImgIv.setImageResource(album.coverImg!!)
        }
    }
}